import { Client, Stat } from './types';

export const WEB3FORMS = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '67b7fc79-ecf4-4316-a209-76757b97c875',
} as const;

export const LINKS = {
  email: 'andres.pereira.coss@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andres-pereira-cossio',
  linkedinHandle: '/in/andres-pereira-cossio',
  github: 'https://github.com/Andres-Pereira',
  calendar: 'https://calendar.app.google/ngXCfpDhtaeg5qgJ7',
  cv: '#cv',
  servicesPdf: '#services-pdf',
} as const;

export const downloadName = (href: string): string | null =>
  /\.pdf$/i.test(href) ? (href.split('/').pop() ?? null) : null;

export const STATS: { years: Stat; projects: Stat; hours: Stat } = {
  years: { value: '3+', label: 'years', sample: false },
  projects: { value: '15+', label: 'projects', sample: false },
  hours: { value: '1.2k', label: 'hours', sample: false },
};

export const CURRENTLY = 'Full-Stack Software Developer · Meta-DAO';

export const CLIENTS: Client[] = Array.from({ length: 8 }, () => ({ sample: true }));
