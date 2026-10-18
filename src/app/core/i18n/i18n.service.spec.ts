import { TestBed } from '@angular/core/testing';
import { DICT } from './dict';
import { I18nService, fmt } from './i18n.service';

describe('DICT', () => {
  it('has the same keys in EN and ES', () => {
    expect(Object.keys(DICT.es)).toEqual(Object.keys(DICT.en));
  });

  it('has no empty strings', () => {
    for (const lang of ['en', 'es'] as const) {
      for (const [key, value] of Object.entries(DICT[lang])) {
        expect(value.trim(), `${lang}.${key}`).not.toBe('');
      }
    }
  });
});

describe('fmt', () => {
  it('replaces placeholders and keeps unknown ones', () => {
    expect(fmt('Thanks, {n}. {x}', { n: 'Ana' })).toBe('Thanks, Ana. {x}');
  });
});

describe('I18nService', () => {
  const create = () => {
    TestBed.resetTestingModule();
    const service = TestBed.inject(I18nService);
    TestBed.tick();
    return service;
  };

  beforeEach(() => {
    localStorage.clear();
    history.replaceState(null, '', '/');
  });

  it('defaults to English', () => {
    const i18n = create();
    expect(i18n.lang()).toBe('en');
    expect(i18n.t().cta).toBe("Let's do it");
    expect(document.documentElement.lang).toBe('en');
  });

  it('switches language, updates <html lang> and remembers the choice', () => {
    const i18n = create();
    i18n.setLang('es');
    TestBed.tick();
    expect(i18n.t().cta).toBe('¡Hagámoslo!');
    expect(document.documentElement.lang).toBe('es');
    expect(create().lang()).toBe('es');
  });

  it('gives ?lang=es priority over the saved choice', () => {
    localStorage.setItem('andy-run.lang', 'en');
    history.replaceState(null, '', '/?lang=es');
    expect(create().lang()).toBe('es');
  });

  it('ignores invalid stored values', () => {
    localStorage.setItem('andy-run.lang', 'fr');
    expect(create().lang()).toBe('en');
  });

  it('picks fixed or bilingual text', () => {
    const i18n = create();
    i18n.setLang('es');
    expect(i18n.pick('Meta-DAO')).toBe('Meta-DAO');
    expect(i18n.pick({ en: 'Web apps', es: 'Apps web' })).toBe('Apps web');
  });
});
