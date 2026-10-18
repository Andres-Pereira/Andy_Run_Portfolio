import { Component, inject } from '@angular/core';
import { CLIENTS } from '../../core/content/profile';
import { I18nService } from '../../core/i18n/i18n.service';
import { SectionHeader } from '../../ui/section-header/section-header';

@Component({
  selector: 'ar-clients',
  imports: [SectionHeader],
  template: `
    <section id="clients" aria-labelledby="clients-title">
      <div class="wrap">
        <ar-section-header headingId="clients-title" [heading]="i18n.t().cTitle" />
        <ul class="grid">
          @for (c of clients; track $index) {
            <!-- Sample: los logos reales irán con NgOptimizedImage (ancho/alto fijos) -->
            <li class="logo">
              <div class="ph" aria-hidden="true"></div>
              <span>{{ c.name ?? i18n.t().client }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    section {
      padding: var(--section-y) var(--gutter);
      border-top: 1px solid var(--border-1);
    }
    .wrap {
      max-width: var(--content-max);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: clamp(40px, 5vw, 64px);
    }
    /* auto-fill con min(46%, 220px): 2 columnas en mobile */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(46%, 220px), 1fr));
      gap: 12px;
    }
    .logo {
      aspect-ratio: 3 / 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      border-radius: var(--radius-lg);
      background: var(--carbon);
      border: 1px solid var(--border-1);
      transition: border-color var(--dur-fast);
    }
    .logo:hover {
      border-color: var(--border-3);
    }
    .ph {
      width: 56%;
      height: 22%;
      border-radius: 8px;
      background: repeating-linear-gradient(135deg, #2a282e 0 8px, #24232a 8px 16px);
    }
    span {
      font: 500 11px/1 var(--font-code);
      letter-spacing: var(--tr-label);
      text-transform: uppercase;
      color: var(--fg-2);
    }
  `,
})
export class Clients {
  protected readonly i18n = inject(I18nService);
  protected readonly clients = CLIENTS;
}
