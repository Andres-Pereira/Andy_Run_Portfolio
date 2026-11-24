import { Component, inject } from '@angular/core';
import { I18nService } from './core/i18n/i18n.service';
import { SeoService } from './core/seo/seo.service';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Nav } from './sections/nav/nav';
import { Projects } from './sections/projects/projects';
import { Services } from './sections/services/services';

@Component({
  selector: 'app-root',
  imports: [About, Contact, Experience, Footer, Hero, Nav, Projects, Services],
  template: `
    <a class="skip" href="#main">{{ i18n.t().skip }}</a>
    <ar-nav />
    <main id="main" tabindex="-1">
      <ar-hero />
      <ar-about />
      <ar-experience />
      <ar-projects />
      <ar-services />
      <ar-contact />
    </main>
    <ar-footer />
  `,
  styles: `
    .skip {
      position: fixed;
      top: 12px;
      left: 12px;
      z-index: 100;
      padding: 12px 18px;
      border-radius: var(--radius-pill);
      background: var(--bone);
      color: var(--ink);
      font-size: 14px;
      font-weight: 600;
      transform: translateY(-200%);
      transition: transform var(--dur-fast) var(--ease-out);
    }
    .skip:focus {
      transform: none;
    }
    main {
      outline: none;
    }
  `,
})
export class App {
  protected readonly i18n = inject(I18nService);

  constructor() {
    inject(SeoService);
  }
}
