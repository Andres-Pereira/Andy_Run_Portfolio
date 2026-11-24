import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject, input, signal } from '@angular/core';

const POSES = [
  {
    h: [65, 15],
    l: [
      ['M56 29 L42 55', 16],
      ['M56 33 L71 42 L81 31', 10],
      ['M53 34 L38 37 L28 48', 10],
      ['M44 55 L64 64 L60 87', 12],
      ['M42 56 L31 73 L13 73', 12],
    ],
    t: [0, 0],
  },
  {
    h: [64, 18],
    l: [
      ['M55 32 L42 58', 16],
      ['M55 36 L67 46 L76 38', 10],
      ['M52 37 L40 42 L33 52', 10],
      ['M44 58 L58 70 L54 88', 12],
      ['M42 59 L32 72 L18 78', 12],
    ],
    t: [2, 3],
  },
  {
    h: [65, 15],
    l: [
      ['M56 29 L42 55', 16],
      ['M56 33 L62 46 L72 47', 10],
      ['M53 34 L44 44 L38 52', 10],
      ['M43 56 L47 72 L42 88', 12],
      ['M43 56 L58 63 L50 76', 12],
    ],
    t: [-1, 0],
  },
  {
    h: [66, 13],
    l: [
      ['M57 27 L43 53', 16],
      ['M57 31 L70 37 L79 27', 10],
      ['M54 32 L41 33 L31 43', 10],
      ['M45 53 L63 55 L67 71', 12],
      ['M43 54 L36 69 L21 63', 12],
    ],
    t: [1, -2],
  },
] as const;

const TRAIL = [
  [11, 51, 8, 1],
  [0, 51, 8, 0.55],
  [5, 41, 5, 0.35],
] as const;

const FLICK = [1, 0.7, 0.9, 0.6];

export const RUN_FRAME_MS = 110;

@Component({
  selector: 'ar-runner',
  template: `
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      @if (trail()) {
        @for (r of trailRects(); track $index) {
          <rect
            [attr.x]="r.x"
            [attr.y]="r.y"
            [attr.width]="r.s"
            [attr.height]="r.s"
            [attr.fill]="trailColor()"
            [attr.fill-opacity]="r.o"
          />
        }
      }
      <g fill="none" [attr.stroke]="color()" stroke-linecap="round" stroke-linejoin="round">
        @for (l of current().l; track $index) {
          <path [attr.d]="l[0]" [attr.stroke-width]="l[1]" />
        }
      </g>
      <circle [attr.cx]="current().h[0]" [attr.cy]="current().h[1]" r="9.5" [attr.fill]="color()" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
      flex: none;
      width: var(--runner-size, 1em);
      height: var(--runner-size, 1em);
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    rect {
      display: var(--runner-trail, inline);
    }
  `,
  host: { '[style.--runner-size]': 'size()' },
})
export class Runner {
  readonly running = input(false);
  readonly trail = input(true);
  readonly pose = input(0);
  readonly size = input('1em');
  readonly color = input('var(--ember)');
  readonly trailColor = input('var(--flame)');

  private readonly frame = signal(0);
  private readonly animating = signal(false);

  private readonly index = computed(() => (this.animating() ? this.frame() : this.pose() % 4));

  protected readonly current = computed(() => POSES[this.index()]);

  protected readonly trailRects = computed(() => {
    const i = this.index();
    const [tx, ty] = POSES[i].t;
    return TRAIL.map(([x, y, s, o], k) => ({
      x: x + tx,
      y: y + ty,
      s,
      o: this.animating() ? o * FLICK[(k + i) % 4] : o,
    }));
  });

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    effect((onCleanup) => {
      const on = this.running() && !reduced;
      this.animating.set(on);
      if (!on) return;
      const id = setInterval(() => this.frame.update((f) => (f + 1) % 4), RUN_FRAME_MS);
      onCleanup(() => clearInterval(id));
    });
  }
}
