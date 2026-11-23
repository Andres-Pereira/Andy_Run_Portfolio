/**
 * Identidad pública del sitio. Única fuente de la URL: canonical, Open Graph y JSON-LD salen de aquí.
 * Al cambiar de dominio, actualizar también public/robots.txt, public/sitemap.xml y el dominio
 * permitido en Web3Forms.
 */
export const SITE = {
  url: 'https://andy-run.vercel.app',
  name: 'Andy.Run',
  person: 'Andrés Pereira',
  jobTitle: 'Full-Stack .NET Developer',
  /** 1200×630, generada con scripts/render-brand-assets.mjs */
  ogImage: '/og.png',
  ogImageAlt: 'Andy.Run — Andrés Pereira, Full-Stack .NET Developer. Built right. Shipped ASAP.',
} as const;
