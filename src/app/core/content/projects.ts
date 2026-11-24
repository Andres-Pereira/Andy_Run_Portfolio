import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    type: 'web',
    title: { en: 'Inventory and asset ERP', es: 'ERP de inventario y activos' },
    desc: {
      en: 'KPI dashboards, sales tracking and role-based security. Deployed on Azure; today it is the company’s main system.',
      es: 'Dashboards de KPIs, seguimiento de ventas y seguridad por roles. Desplegado en Azure; hoy es el sistema principal de la empresa.',
    },
    stack: ['Angular', 'C#', 'SQL Server', 'Azure'],
    sample: false,
  },
  {
    type: 'web',
    title: { en: '3-D Secure 2 payments', es: 'Pagos con 3-D Secure 2' },
    desc: {
      en: 'Stripe 3DS2 authentication on a global association’s billing page, covering challenges, failures and retries without duplicate charges.',
      es: 'Autenticación 3DS2 con Stripe en la página de pagos de una asociación global: challenges, fallos y reintentos sin cobros duplicados.',
    },
    stack: ['C#', 'ASP.NET Web Forms', 'JavaScript', 'Stripe'],
    sample: false,
  },
  {
    type: 'ai',
    title: { en: 'Azure DevOps automations', es: 'Automatizaciones de Azure DevOps' },
    desc: {
      en: 'n8n workflows that write wiki pages for finished tasks, carry unfinished work into the next sprint and send ETA reminders.',
      es: 'Workflows en n8n que escriben la wiki de las tareas terminadas, pasan el trabajo pendiente al siguiente sprint y envían recordatorios de ETA.',
    },
    stack: ['n8n', 'Azure DevOps API', 'JavaScript'],
    sample: false,
  },
  {
    type: 'ai',
    title: { en: 'AI development toolkit', es: 'Toolkit de desarrollo con IA' },
    desc: {
      en: 'AI coding agents connected to Azure DevOps through MCP, with reusable skills that document tasks and create work items from emails.',
      es: 'Agentes de IA conectados a Azure DevOps por MCP, con skills reutilizables que documentan tareas y crean work items desde correos.',
    },
    stack: ['AI agents', 'MCP', 'Azure DevOps'],
    sample: false,
  },
  {
    type: 'web',
    title: { en: 'Chapter management portal', es: 'Portal de gestión de capítulos' },
    desc: {
      en: 'Modals, reports, data tables and multi-step wizards for a national trade association’s chapter portal.',
      es: 'Modales, reportes, tablas y wizards de varios pasos para el portal de capítulos de una asociación nacional.',
    },
    stack: ['C#', 'ASP.NET Web Forms', 'SQL Server', 'netFORUM'],
    sample: false,
  },
  {
    type: 'ai',
    title: { en: 'RAG embeddings pipeline', es: 'Pipeline de embeddings RAG' },
    desc: {
      en: 'A local Ollama model behind an authenticated tunnel feeds n8n, which stores 768-dimension vectors in Supabase for semantic search.',
      es: 'Un modelo local de Ollama detrás de un túnel autenticado alimenta n8n, que guarda vectores de 768 dimensiones en Supabase para búsqueda semántica.',
    },
    stack: ['Ollama', 'n8n', 'Supabase'],
    sample: false,
  },
];
