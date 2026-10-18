import { Client, Stat } from './types';

/**
 * Web3Forms: reenvía el formulario de contacto al correo de Andy.
 * El access key es público por diseño (va en el navegador y solo permite enviar a ese correo).
 * Dominio permitido en el panel de Web3Forms: localhost → cambiar al dominio de Vercel en la Fase 9.
 */
export const WEB3FORMS = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '67b7fc79-ecf4-4316-a209-76757b97c875',
} as const;

// Links y datos de contacto. Sample: los reemplaza Andy antes del lanzamiento.
export const LINKS = {
  email: 'hello@andy.run', // Sample
  linkedin: 'https://www.linkedin.com/', // Sample
  linkedinHandle: '/in/andres-pereira', // Sample
  github: 'https://github.com/', // Sample
  calendar: 'https://calendar.google.com/', // Sample: URL de citas pendiente
  cv: '#cv', // PDF pendiente (un solo CV, en inglés)
  servicesPdf: '#services-pdf', // PDF pendiente
} as const;

// About › stats (Sample).
export const STATS: { years: Stat; projects: Stat; hours: Stat } = {
  years: { value: '6+', label: 'years', sample: true },
  projects: { value: '30+', label: 'projects', sample: true },
  hours: { value: '1.2k', label: 'hours', sample: true },
};

// Franja "Currently" del About.
export const CURRENTLY = 'Full-Stack .NET Developer · Meta-DAO';

// Clients: 8 logos placeholder.
export const CLIENTS: Client[] = Array.from({ length: 8 }, () => ({ sample: true }));
