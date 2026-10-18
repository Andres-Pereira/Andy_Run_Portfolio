import { Project } from './types';

// Sample: todos los proyectos son placeholder (README › Sample content).
// Links del prototipo (placeholder). Sin github o demo, ese botón no se renderiza.
export const PROJECTS: Project[] = [
  {
    type: 'web',
    title: { en: 'Sales admin panel', es: 'Panel admin de ventas' },
    desc: {
      en: 'Orders, quotes and stock in one place for a distribution team.',
      es: 'Pedidos, cotizaciones y stock en un solo lugar para un equipo de distribución.',
    },
    stack: ['Angular', '.NET', 'SQL Server'],
    github: 'https://github.com/',
    demo: '#demo',
    sample: true,
  },
  {
    type: 'ai',
    title: { en: 'WhatsApp support agent', es: 'Agente de soporte en WhatsApp' },
    desc: {
      en: 'Answers FAQs, schedules follow-ups and logs every chat in the CRM.',
      es: 'Responde preguntas frecuentes, agenda seguimientos y registra cada chat en el CRM.',
    },
    stack: ['C#', 'AI agents', 'CRM API'],
    demo: '#demo',
    sample: true,
  },
  {
    type: 'landing',
    title: { en: 'Clinic landing page', es: 'Landing para clínica' },
    desc: {
      en: 'A fast page with online booking that replaced a phone-only flow.',
      es: 'Una página rápida con reservas online que reemplazó el flujo solo por teléfono.',
    },
    stack: ['HTML', 'CSS', 'JS'],
    github: 'https://github.com/',
    demo: '#demo',
    sample: true,
  },
  {
    type: 'web',
    title: { en: 'Inventory ERP module', es: 'Módulo ERP de inventario' },
    desc: {
      en: 'Purchasing, stock movements and reports on top of an existing ERP.',
      es: 'Compras, movimientos de stock y reportes sobre un ERP existente.',
    },
    stack: ['ASP.NET', 'Blazor', 'SQL Server'],
    github: 'https://github.com/',
    sample: true,
  },
  {
    type: 'ai',
    title: { en: 'Invoice data-entry automation', es: 'Automatización de carga de facturas' },
    desc: {
      en: 'Reads supplier PDFs and loads them into the ERP for review.',
      es: 'Lee PDFs de proveedores y los carga en el ERP para revisión.',
    },
    stack: ['.NET', 'AI agents', 'SQL Server'],
    github: 'https://github.com/',
    demo: '#demo',
    sample: true,
  },
  {
    type: 'landing',
    title: { en: 'Product launch page', es: 'Página de lanzamiento' },
    desc: {
      en: 'Launch page with a waitlist and analytics for a B2B product.',
      es: 'Página de lanzamiento con lista de espera y analítica para un producto B2B.',
    },
    stack: ['Angular', 'HTML', 'CSS'],
    demo: '#demo',
    sample: true,
  },
];
