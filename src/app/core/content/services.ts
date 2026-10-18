import { Service } from './types';

// Sample: solo los tiempos estimados.
export const SERVICES: Service[] = [
  {
    index: '01 · Web apps',
    title: { en: 'Web apps', es: 'Apps web' },
    desc: {
      en: 'Custom apps your team uses every day, built on .NET and Angular.',
      es: 'Apps a medida que tu equipo usa todos los días, sobre .NET y Angular.',
    },
    examples: [
      { en: 'Client portals', es: 'Portales de clientes' },
      { en: 'Quoting and booking tools', es: 'Cotizadores y reservas' },
      { en: 'Internal dashboards', es: 'Dashboards internos' },
    ],
    time: { en: 'From 4 weeks', es: 'Desde 4 semanas' },
    sample: true,
  },
  {
    index: '02 · ERP · CRM',
    title: { en: 'ERP, CRM and admin systems', es: 'Sistemas ERP, CRM y admin' },
    desc: {
      en: 'Modules that follow how your business actually runs, on real data.',
      es: 'Módulos que siguen cómo funciona tu negocio, con datos reales.',
    },
    examples: [
      { en: 'Inventory and purchasing', es: 'Inventario y compras' },
      { en: 'Sales pipeline', es: 'Pipeline de ventas' },
      { en: 'Admin panels and reports', es: 'Paneles y reportes' },
    ],
    time: { en: 'From 8 weeks', es: 'Desde 8 semanas' },
    sample: true,
  },
  {
    index: '03 · AI',
    title: { en: 'AI agents and automations', es: 'Agentes IA y automatizaciones' },
    desc: {
      en: 'Agents and workflows that take repetitive work off your team.',
      es: 'Agentes y flujos que le quitan trabajo repetitivo a tu equipo.',
    },
    examples: [
      { en: 'Support on WhatsApp or web', es: 'Soporte por WhatsApp o web' },
      { en: 'Follow-ups and reminders', es: 'Seguimientos y recordatorios' },
      { en: 'Data entry from PDFs', es: 'Carga de datos desde PDFs' },
    ],
    time: { en: 'From 2 weeks', es: 'Desde 2 semanas' },
    sample: true,
  },
  {
    index: '04 · Web',
    title: { en: 'Landing pages', es: 'Landing pages' },
    desc: {
      en: 'Fast, well-built pages that explain what you sell.',
      es: 'Páginas rápidas y bien hechas que explican lo que vendes.',
    },
    examples: [
      { en: 'Product launches', es: 'Lanzamientos de producto' },
      { en: 'Company sites', es: 'Sitios de empresa' },
      { en: 'Campaign pages', es: 'Páginas de campaña' },
    ],
    time: { en: 'From 1 week', es: 'Desde 1 semana' },
    sample: true,
  },
];
