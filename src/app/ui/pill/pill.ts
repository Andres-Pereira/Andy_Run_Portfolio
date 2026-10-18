import { Component, input } from '@angular/core';

export type PillVariant = 'glass' | 'accent';

/** Pill del DS: etiqueta, badge o chip de stack. */
@Component({
  selector: 'ar-pill',
  template: `@if (dot()) {
      <span class="dot" aria-hidden="true"></span>
    }
    <ng-content />`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      align-self: flex-start;
      gap: 8px;
      padding: 7px 14px;
      border-radius: var(--radius-pill);
      font-family: var(--font-sans);
      font-size: 13px;
      line-height: 1.2;
      white-space: nowrap;
    }
    :host(.glass) {
      background: var(--glass-fill);
      border: 1px solid var(--glass-border);
      color: var(--bone);
      -webkit-backdrop-filter: blur(var(--blur-pill));
      backdrop-filter: blur(var(--blur-pill));
    }
    :host(.accent) {
      background: var(--accent-fill);
      border: 1px solid var(--accent-border);
      color: var(--glow);
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--glow);
      box-shadow: 0 0 8px var(--glow);
    }
  `,
  host: { '[class]': 'variant()' },
})
export class Pill {
  readonly variant = input<PillVariant>('glass');
  readonly dot = input(false, { transform: (v: boolean | '') => v !== false });
}
