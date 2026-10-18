import { Component, input } from '@angular/core';

export type TextureVariant = 'fluted-ring' | 'ember-rise';

/**
 * Fondo de firma del DS (components/backgrounds/Texture.jsx). Llena su padre posicionado.
 * Solo las dos variantes que usa la página (regla 80/20): fluted-ring (A3, hero) y ember-rise (contacto).
 */
@Component({
  selector: 'ar-texture',
  template: `
    @switch (variant()) {
      @case ('fluted-ring') {
        <div class="ring ring-a"></div>
        <div class="ring ring-b"></div>
        <div class="flutes"></div>
      }
      @case ('ember-rise') {
        <div class="rise"></div>
      }
    }
    @if (grain()) {
      <div class="grain"></div>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: var(--ink);
      pointer-events: none;
    }
    div {
      position: absolute;
    }

    .ring {
      left: 50%;
      top: 50%;
      width: 80%;
      aspect-ratio: 1;
      border-radius: 50%;
    }
    .ring-a {
      transform: translate(-50%, -50%);
      background: radial-gradient(
        circle closest-side,
        transparent 52%,
        #ff5a1f 64%,
        #ffc46b 70%,
        #ff5a1f 76%,
        transparent 92%
      );
      filter: blur(12px);
    }
    .ring-b {
      transform: translate(calc(-50% + 12px), -50%) scaleX(1.06);
      background: radial-gradient(
        circle closest-side,
        transparent 50%,
        #ff8a3d 62%,
        #ffc46b 69%,
        #ff5a1f 76%,
        transparent 92%
      );
      filter: blur(7px);
      -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 6px, transparent 6px 12px);
      mask-image: repeating-linear-gradient(90deg, #000 0 6px, transparent 6px 12px);
    }
    .flutes {
      inset: 0;
      background: repeating-linear-gradient(
        90deg,
        rgba(11, 10, 12, 0.5) 0 2px,
        rgba(244, 239, 232, 0.07) 4px,
        transparent 7px,
        rgba(11, 10, 12, 0.3) 12px
      );
    }

    .rise {
      inset: 0;
      background: var(--grad-ember-rise);
    }

    .grain {
      inset: 0;
      background-image: var(--grain);
      background-size: 240px;
      mix-blend-mode: overlay;
      opacity: var(--grain-opacity);
    }
    :host(.fluted-ring) {
      --grain-opacity: 0.4;
    }
    :host(.ember-rise) {
      --grain-opacity: 0.45;
    }
  `,
  host: { '[class]': 'variant()', 'aria-hidden': 'true' },
})
export class Texture {
  readonly variant = input<TextureVariant>('ember-rise');
  readonly grain = input(true);
}
