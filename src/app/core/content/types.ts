import { Dict, Lang } from '../i18n/dict';

export type Bilingual = Record<Lang, string>;

export type Text = string | Bilingual;

export type ProjectType = 'web' | 'ai' | 'landing';

export interface Project {
  type: ProjectType;
  title: Bilingual;
  desc: Bilingual;
  stack: string[];
  github?: string;
  demo?: string;
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
