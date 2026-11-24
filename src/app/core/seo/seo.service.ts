import { DOCUMENT } from '@angular/common';
import { Service, effect, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { LINKS } from '../content/profile';
import { SITE } from '../content/site';
import { I18nService } from '../i18n/i18n.service';

const OG_LOCALE = { en: 'en_US', es: 'es_ES' } as const;

@Service()
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18nService);

  constructor() {
    this.setStaticTags();

    effect(() => {
      const t = this.i18n.t();
      const locale = OG_LOCALE[this.i18n.lang()];
      this.title.setTitle(t.metaTitle);
      this.meta.updateTag({ name: 'description', content: t.metaDesc });
      this.meta.updateTag({ property: 'og:title', content: t.metaTitle });
      this.meta.updateTag({ property: 'og:description', content: t.metaDesc });
      this.meta.updateTag({ property: 'og:locale', content: locale });
      this.meta.updateTag({ name: 'twitter:title', content: t.metaTitle });
      this.meta.updateTag({ name: 'twitter:description', content: t.metaDesc });
    });
  }

  private setStaticTags(): void {
    const url = `${SITE.url}/`;
    const image = `${SITE.url}${SITE.ogImage}`;

    this.setCanonical(url);
    const tags: MetaDefinition[] = [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: SITE.ogImageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: SITE.ogImageAlt },
    ];
    tags.forEach((tag) => this.meta.updateTag(tag));
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${url}#person`,
          name: SITE.person,
          jobTitle: SITE.jobTitle,
          url,
          image,
          sameAs: [LINKS.linkedin, LINKS.github],
          knowsAbout: ['C#', '.NET', 'Angular', 'SQL Server', 'n8n', 'AI agents'],
        },
        {
          '@type': 'WebSite',
          '@id': `${url}#website`,
          url,
          name: SITE.name,
          inLanguage: ['en', 'es'],
          publisher: { '@id': `${url}#person` },
        },
      ],
    });
  }

  private setCanonical(href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = href;
  }

  private setJsonLd(data: object): void {
    let script = this.doc.head.querySelector<HTMLScriptElement>('script#ld-json');
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'ld-json';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
