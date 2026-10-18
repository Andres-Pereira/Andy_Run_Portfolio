import { Component, input } from '@angular/core';

/**
 * Apertura de sección: h2 grande a la izquierda, intro a la derecha (grid auto-fit).
 * Sin índice numérico (decisión de Andy). Las acciones (CV, PDF) van fuera, como en el prototipo.
 */
@Component({
  selector: 'ar-section-header',
  template: `
    <div>
      <h2 [id]="headingId()">{{ heading() }}</h2>
    </div>
    @if (intro()) {
      <p class="intro">{{ intro() }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
      gap: 40px 64px;
      align-items: end;
      font-family: var(--font-sans);
      color: var(--fg-1);
    }
    h2 {
      margin-top: 20px;
      font-size: clamp(40px, 5.5vw, 76px);
      font-weight: 600;
      letter-spacing: -0.05em;
      line-height: 0.95;
      text-wrap: balance;
    }
    .intro {
      max-width: 560px;
      font-size: 19px;
      line-height: 1.55;
      color: var(--fg-2);
      text-wrap: pretty;
    }
    @media (max-width: 759.98px) {
      :host {
        gap: 24px;
      }
    }
  `,
})
export class SectionHeader {
  readonly heading = input.required<string>();
  readonly intro = input<string>();
  /** Para aria-labelledby de la <section>. */
  readonly headingId = input<string>();
}
