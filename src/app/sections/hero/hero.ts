import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LINKS } from '../../core/content/profile';
import { I18nService } from '../../core/i18n/i18n.service';
import { Button } from '../../ui/button/button';
import { IconButton } from '../../ui/icon-button/icon-button';
import { Isotype } from '../../ui/isotype/isotype';
import { Pill } from '../../ui/pill/pill';
import { Texture } from '../../ui/texture/texture';

const CMD = 'Andy.Run';
const LAST_STEP = 7;

/** Ancho de los íconos sociales en la fila: 2 botones de 44px + gap de 10px. */
const SOCIAL_WIDTH = 2 * 44 + 10;

/**
 * ¿Entran CTA + links + badge + íconos en una sola línea? En mobile (< 760px) siempre
 * se dejan en la fila: ahí bajan a su propia línea, como en el mockup.
 */
export function socialFitsInRow(
  rowWidth: number,
  itemWidths: number[],
  gap: number,
  desktop: boolean,
): boolean {
  if (!desktop) return true;
  const needed = itemWidths.reduce((a, b) => a + b, 0) + SOCIAL_WIDTH + gap * itemWidths.length;
  return needed <= rowWidth;
}

/**
 * Ritmo del boot (ms). Más rápido que el prototipo (3.9s → ~2s) a pedido de Andy:
 * los pasos (140ms) son más cortos que las transiciones (220–420ms), así que se solapan y fluyen.
 */
export const BOOT = {
  start: 300, // espera antes de escribir (prototipo: 500)
  perChar: 55, // por carácter de "Andy.Run" (prototipo: 80)
  afterTyping: 350, // isotype corriendo → paso 1 (prototipo: 1320)
  firstStep: 100, // paso 1 → paso 2 (prototipo: 260)
  perStep: 140, // entre pasos 2–7 (prototipo: 200)
  beforeHeadline: 200, // paso 5 → headline (prototipo: 380)
} as const;

/** Paso 2–4 = data lines, 7 = acciones y cursor del headline (el h1 ya es visible desde el render). */
export function bootTimeline(): { at: number; typed?: number; runOn?: boolean; step?: number }[] {
  const events: { at: number; typed?: number; runOn?: boolean; step?: number }[] = [];
  let t = BOOT.start;
  for (let i = 1; i <= CMD.length; i++) {
    events.push({ at: t, typed: i });
    t += BOOT.perChar;
  }
  events.push({ at: t, runOn: true });
  t += BOOT.afterTyping;
  events.push({ at: t, step: 1 });
  t += BOOT.firstStep;
  for (let s = 2; s <= LAST_STEP; s++) {
    events.push({ at: t, step: s });
    t += s === 5 ? BOOT.beforeHeadline : BOOT.perStep;
  }
  return events;
}

@Component({
  selector: 'ar-hero',
  imports: [Button, IconButton, Isotype, Pill, Texture],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { id: 'top' },
})
export class Hero {
  protected readonly i18n = inject(I18nService);
  protected readonly links = LINKS;

  // Estado inicial = lo que se prerenderiza: texto presente en el DOM pero con opacidad 0.
  protected readonly typed = signal(0);
  protected readonly step = signal(0);
  protected readonly runOn = signal(false);

  protected readonly cmdA = computed(() => CMD.slice(0, Math.min(this.typed(), 4)));
  protected readonly cmdB = computed(() => CMD.slice(4, Math.max(4, this.typed())));
  protected readonly showIso = computed(() => this.typed() >= CMD.length);
  protected readonly typing = computed(() => this.step() < 1);
  protected readonly done = computed(() => this.step() >= LAST_STEP);

  /** Íconos sociales en la barra de la terminal cuando no entran en la fila de acciones. */
  protected readonly iconsInBar = signal(false);

  private readonly actions = viewChild.required<ElementRef<HTMLElement>>('actions');
  private readonly cta = viewChild.required('cta', { read: ElementRef<HTMLElement> });
  private readonly paths = viewChild.required<ElementRef<HTMLElement>>('paths');
  private readonly badge = viewChild.required('badge', { read: ElementRef<HTMLElement> });

  private timers: ReturnType<typeof setTimeout>[] = [];
  private removeScroll?: () => void;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const destroyRef = inject(DestroyRef);

    // Tras la hidratación, para no cambiar el DOM mientras Angular lo reutiliza.
    afterNextRender(() => {
      this.watchActionsRow(destroyRef);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return this.skip();

      const onScroll = () => {
        if (scrollY > 40) this.skip();
      };
      addEventListener('scroll', onScroll, { passive: true });
      this.removeScroll = () => removeEventListener('scroll', onScroll);

      for (const e of bootTimeline()) {
        this.timers.push(
          setTimeout(() => {
            if (e.typed !== undefined) this.typed.set(e.typed);
            if (e.runOn) this.runOn.set(true);
            if (e.step !== undefined) this.step.set(e.step);
            if (e.step === LAST_STEP) this.removeScroll?.();
          }, e.at),
        );
      }
    });

    destroyRef.onDestroy(() => this.clear());
  }

  /** Salta al estado final (click en la terminal, scroll > 40px o reduced-motion). */
  protected skip(): void {
    if (this.done()) return;
    this.clear();
    this.typed.set(CMD.length);
    this.step.set(LAST_STEP);
    this.runOn.set(!matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /** Mide la fila (y sus textos, que cambian con el idioma) y decide dónde van los íconos. */
  private watchActionsRow(destroyRef: DestroyRef): void {
    const desktop = matchMedia('(min-width: 760px)');
    const row = this.actions().nativeElement;
    const items = [this.cta(), this.paths(), this.badge()].map(
      (r) => r.nativeElement as HTMLElement,
    );
    const update = () =>
      this.iconsInBar.set(
        !socialFitsInRow(
          row.clientWidth,
          items.map((e) => e.getBoundingClientRect().width),
          parseFloat(getComputedStyle(row).columnGap) || 0,
          desktop.matches,
        ),
      );
    const observer = new ResizeObserver(update);
    [row, ...items].forEach((e) => observer.observe(e));
    destroyRef.onDestroy(() => observer.disconnect());
  }

  private clear(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.removeScroll?.();
    this.removeScroll = undefined;
  }
}
