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

const SOCIAL_WIDTH = 2 * 44 + 10;

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

export const BOOT = {
  start: 300,
  perChar: 55,
  afterTyping: 350,
  firstStep: 100,
  perStep: 140,
  beforeHeadline: 200,
} as const;

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

  protected readonly typed = signal(0);
  protected readonly step = signal(0);
  protected readonly runOn = signal(false);

  protected readonly cmdA = computed(() => CMD.slice(0, Math.min(this.typed(), 4)));
  protected readonly cmdB = computed(() => CMD.slice(4, Math.max(4, this.typed())));
  protected readonly showIso = computed(() => this.typed() >= CMD.length);
  protected readonly typing = computed(() => this.step() < 1);
  protected readonly done = computed(() => this.step() >= LAST_STEP);

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

  protected skip(): void {
    if (this.done()) return;
    this.clear();
    this.typed.set(CMD.length);
    this.step.set(LAST_STEP);
    this.runOn.set(!matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

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
