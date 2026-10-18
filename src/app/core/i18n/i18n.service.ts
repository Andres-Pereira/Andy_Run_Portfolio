import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Service, computed, effect, inject, signal } from '@angular/core';
import { Text } from '../content/types';
import { DICT, Lang, LANGS } from './dict';

const STORAGE_KEY = 'andy-run.lang';

const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

/** Reemplaza `{clave}` en un texto del diccionario. Ej.: fmt(t().thanks, { n: 'Ana' }). */
export const fmt = (text: string, vars: Record<string, string>): string =>
  text.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);

@Service()
export class I18nService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Idioma activo. En el prerender siempre es 'en' (default del README). */
  readonly lang = signal<Lang>('en');

  /** Diccionario del idioma activo. */
  readonly t = computed(() => DICT[this.lang()]);

  constructor() {
    if (this.isBrowser) {
      // Prioridad: ?lang=es (comportamiento del prototipo) → última elección guardada → 'en'
      const fromUrl = new URLSearchParams(this.doc.location.search).get('lang');
      const initial = isLang(fromUrl) ? fromUrl : this.read();
      if (initial) this.lang.set(initial);
    }

    effect(() => {
      const lang = this.lang();
      this.doc.documentElement.lang = lang;
      if (this.isBrowser) this.write(lang);
    });
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  /** Resuelve un texto de contenido: string fijo o { en, es }. */
  pick(text: Text): string {
    return typeof text === 'string' ? text : text[this.lang()];
  }

  // localStorage puede lanzar en modo privado o con almacenamiento bloqueado: se ignora.
  private read(): Lang | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return isLang(saved) ? saved : null;
    } catch {
      return null;
    }
  }

  private write(lang: Lang): void {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* sin persistencia */
    }
  }
}
