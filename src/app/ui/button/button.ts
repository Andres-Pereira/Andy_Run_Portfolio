import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIcon = 'download';

@Component({
  selector: 'a[arButton], button[arButton]',
  template: `@if (icon() === 'download') {
      <svg
        class="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 15V3" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
      </svg>
    }
    <ng-content />
    @if (arrow()) {
      <span aria-hidden="true">→</span>
    }`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex: none;
      white-space: nowrap;
      border-radius: var(--radius-pill);
      font-family: var(--font-sans);
      letter-spacing: -0.01em;
      line-height: normal;
      text-decoration: none;
      cursor: pointer;
      transition:
        background var(--dur-fast),
        color var(--dur-fast),
        transform var(--dur-fast);
    }
    .icon {
      width: 1.15em;
      height: 1.15em;
      flex: none;
    }
    :host(:hover) {
      transform: translateY(-1px);
    }
    :host(:disabled) {
      cursor: not-allowed;
      opacity: 0.45;
      transform: none;
    }

    :host(.sm) {
      padding: 9px 18px;
      font-size: 14px;
    }
    :host(.md) {
      padding: 14px 24px;
      font-size: 15px;
    }
    :host(.lg) {
      padding: 20px 36px;
      font-size: 18px;
    }

    :host(.primary) {
      background: var(--ember);
      color: var(--ink);
      font-weight: 600;
      border: 1px solid transparent;
      box-shadow: var(--shadow-cta);
    }
    :host(.primary:hover) {
      background: var(--flame);
      color: var(--ink);
    }

    :host(.glass) {
      background: rgba(244, 239, 232, 0.06);
      color: var(--bone);
      font-weight: 500;
      border: 1px solid var(--border-3);
      -webkit-backdrop-filter: blur(var(--blur-pill));
      backdrop-filter: blur(var(--blur-pill));
    }
    :host(.glass:hover) {
      background: rgba(244, 239, 232, 0.12);
      color: var(--bone);
    }
  `,
  host: {
    '[class]': 'variant() + " " + size()',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly icon = input<ButtonIcon>();
  readonly arrow = input(false, { transform: (v: boolean | '') => v !== false });
}
