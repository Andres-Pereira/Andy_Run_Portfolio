import { Dict, Lang } from '../i18n/dict';

/** Texto en ambos idiomas. Lo resuelve I18nService.pick(). */
export type Bilingual = Record<Lang, string>;

/** Texto que puede ser igual en ambos idiomas (nombres propios, stack). */
export type Text = string | Bilingual;

export type ProjectType = 'web' | 'ai' | 'landing';

export interface Project {
  type: ProjectType;
  title: Bilingual;
  desc: Bilingual;
  stack: string[];
  /** Cada botón se renderiza solo si existe su link. */
  github?: string;
  demo?: string;
  /** Captura 16:10; sin ella se muestra el placeholder hatched. */
  image?: string;
  sample: boolean;
}

export interface Job {
  role: Text;
  company: Text;
  dates: Text;
  current: boolean;
  desc: Bilingual;
  stack: string[];
  sample: boolean;
}

export interface Service {
  /** Label mono, p. ej. "01 · Web apps". Se mantiene en inglés como en el prototipo. */
  index: string;
  title: Bilingual;
  desc: Bilingual;
  examples: Bilingual[];
  time: Bilingual;
  sample: boolean;
}

export interface Stat {
  value: string;
  label: keyof Dict;
  sample: boolean;
}

export interface Client {
  name?: string;
  logo?: string;
  sample: boolean;
}
