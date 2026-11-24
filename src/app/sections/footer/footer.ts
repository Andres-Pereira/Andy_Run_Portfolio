import { Component } from '@angular/core';
import { Wordmark } from '../../ui/wordmark/wordmark';

@Component({
  selector: 'ar-footer',
  imports: [Wordmark],
  template: `
    <footer>
      <div class="wrap">
        <div class="brand">
          <ar-wordmark [size]="24" />
          <span class="tagline">Built right. Shipped ASAP.</span>
        </div>
        <small>© 2026 Andrés Pereira</small>
      </div>
    </footer>
  `,
  styles: `
    footer {
      padding: 32px var(--gutter);
      border-top: 1px solid var(--border-1);
    }
    .wrap {
      max-width: var(--content-max);
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .brand {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 24px;
    }
    .tagline {
      font-size: 14px;
      color: var(--fg-2);
    }
    @media (max-width: 759.98px) {
      .tagline {
        display: none;
      }
    }
    small {
      font: 500 12px/1 var(--font-code);
      letter-spacing: var(--tr-label);
      text-transform: uppercase;
      color: var(--fg-2);
    }
  `,
})
export class Footer {}
