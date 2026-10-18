import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
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

/**
 * Secuencia de boot del prototipo (ms desde la carga):
 * 500 empieza a escribir · +80 por carácter · isotype corre · +1320 paso 1 · +260 paso 2
 * · pasos 3–7 cada 200ms (380ms tras el 5). Paso 2–4 = data lines, 6 = headline, 7 = acciones.
 */
export function bootTimeline(): { at: number; typed?: number; runOn?: boolean; step?: number }[] {
  const events: { at: number; typed?: number; runOn?: boolean; step?: number }[] = [];
  let t = 500;
  for (let i = 1; i <= CMD.length; i++) {
    events.push({ at: t, typed: i });
    t += 80;
  }
  events.push({ at: t, runOn: true });
  t += 1320;
  events.push({ at: t, step: 1 });
  t += 260;
  for (let s = 2; s <= LAST_STEP; s++) {
    events.push({ at: t, step: s });
    t += s === 5 ? 380 : 200;
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

  private timers: ReturnType<typeof setTimeout>[] = [];
  private removeScroll?: () => void;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const destroyRef = inject(DestroyRef);

    // Tras la hidratación, para no cambiar el DOM mientras Angular lo reutiliza.
    afterNextRender(() => {
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

  private clear(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.removeScroll?.();
    this.removeScroll = undefined;
  }
}
