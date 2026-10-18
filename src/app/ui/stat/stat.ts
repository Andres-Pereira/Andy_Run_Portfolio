import { Component, input } from '@angular/core';

export type StatSize = 'sm' | 'md' | 'lg';

/**
 * Número grande en Departure Mono + label Geist.
 * `sizeMobile` aplica por debajo de 760px con media query (sin leer el ancho en JS).
 * El número nunca desborda su contenedor: si no cabe al tamaño del diseño, se achica
 * (container query: ancho / (caracteres × avance de Departure Mono)).
 */
@Component({
  selector: 'ar-stat',
  template: `
    <span class="value">{{ value() }}</span>
    @if (label()) {
      <span class="caption">{{ label() }}</span>
    }
  `,
  styles: `
    :host {
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-family: var(--font-sans);
      --stat-fs: 96px;
      --stat-label: 14px;
    }
    :host(.d-sm) {
      --stat-fs: 44px;
    }
    :host(.d-lg) {
      --stat-fs: 180px;
      --stat-label: 22px;
    }

    .value {
      font-family: var(--font-data);
      /* 0.64em ≈ avance por carácter de Departure Mono (0.636em) */
      font-size: min(var(--stat-fs), calc(100cqi / (var(--stat-chars) * 0.64)));
      line-height: 0.85;
      white-space: nowrap;
      color: var(--bone);
    }
    .caption {
      max-width: 320px;
      font-size: var(--stat-label);
      line-height: 1.4;
      color: rgba(244, 239, 232, 0.8);
    }

    @media (max-width: 759.98px) {
      :host(.m-sm) {
        --stat-fs: 44px;
        --stat-label: 14px;
      }
      :host(.m-md) {
        --stat-fs: 96px;
        --stat-label: 14px;
      }
      :host(.m-lg) {
        --stat-fs: 180px;
        --stat-label: 22px;
      }
    }
  `,
  host: {
    '[class]': '"d-" + size() + (sizeMobile() ? " m-" + sizeMobile() : "")',
    '[style.--stat-chars]': 'value().length',
  },
})
export class Stat {
  readonly value = input.required<string>();
  readonly label = input<string>();
  readonly size = input<StatSize>('md');
  readonly sizeMobile = input<StatSize>();
}
