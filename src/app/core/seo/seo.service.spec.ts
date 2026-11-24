import { TestBed } from '@angular/core/testing';
import { SITE } from '../content/site';
import { DICT } from '../i18n/dict';
import { I18nService } from '../i18n/i18n.service';
import { SeoService } from './seo.service';

const meta = (attr: 'name' | 'property', key: string) =>
  document.head.querySelectorAll(`meta[${attr}="${key}"]`);

describe('SeoService', () => {
  beforeEach(() => {
    localStorage.clear();
    history.replaceState(null, '', '/');
    document.head
      .querySelectorAll('meta, link[rel="canonical"], script#ld-json')
      .forEach((e) => e.remove());
  });

  const create = () => {
    TestBed.resetTestingModule();
    TestBed.inject(SeoService);
    TestBed.tick();
    return TestBed.inject(I18nService);
  };

  it('writes title, description, Open Graph, canonical and JSON-LD in English', () => {
    create();
    expect(document.title).toBe(DICT.en.metaTitle);
    expect(meta('name', 'description')[0].getAttribute('content')).toBe(DICT.en.metaDesc);
    expect(meta('property', 'og:image')[0].getAttribute('content')).toBe(`${SITE.url}/og.png`);
    expect(meta('property', 'og:locale')[0].getAttribute('content')).toBe('en_US');
    expect(meta('name', 'twitter:card')[0].getAttribute('content')).toBe('summary_large_image');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${SITE.url}/`,
    );

    const ld = JSON.parse(document.head.querySelector('script#ld-json')!.textContent!);
    expect(ld['@graph'][0]).toMatchObject({ '@type': 'Person', name: 'Andrés Pereira' });
  });

  it('switches title, description and locale to Spanish without duplicating tags', () => {
    const i18n = create();
    i18n.setLang('es');
    TestBed.tick();

    expect(document.title).toBe(DICT.es.metaTitle);
    expect(meta('name', 'description')).toHaveLength(1);
    expect(meta('name', 'description')[0].getAttribute('content')).toBe(DICT.es.metaDesc);
    expect(meta('property', 'og:locale')[0].getAttribute('content')).toBe('es_ES');
    expect(meta('property', 'og:title')).toHaveLength(1);

    create();
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('script#ld-json')).toHaveLength(1);
    expect(meta('property', 'og:image')).toHaveLength(1);
  });
});
