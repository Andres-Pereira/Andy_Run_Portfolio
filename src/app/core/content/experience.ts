import { Bilingual, Job } from './types';

export const JOBS: Job[] = [
  {
    role: 'Full-Stack Software Developer',
    company: 'Meta-DAO',
    dates: { en: 'Mar 2026 – Present', es: 'Mar 2026 – Actualidad' },
    current: true,
    desc: {
      en: 'netFORUM association management systems for professional associations in North America and Europe, including payments and workflow automation.',
      es: 'Sistemas de gestión netFORUM para asociaciones profesionales de Norteamérica y Europa, incluidos pagos y automatización de procesos.',
    },
    stack: ['C#', '.NET', 'ASP.NET Web Forms', 'SQL Server', 'n8n'],
    sample: false,
  },
  {
    role: { en: 'Software Developer', es: 'Desarrollador de software' },
    company: 'Prime Factor Solutions',
    dates: 'Jul 2024 – Mar 2026',
    current: false,
    desc: {
      en: 'Custom controls, reports and integrations for ERP/CRM platforms used by professional associations: registration, checkout, dashboards and profile pages.',
      es: 'Controles a medida, reportes e integraciones para plataformas ERP/CRM de asociaciones profesionales: registro, checkout, dashboards y perfiles.',
    },
    stack: ['C#', '.NET', 'ASP.NET Web Forms', 'Angular', 'SQL Server'],
    sample: false,
  },
  {
    role: { en: 'Freelance Software Developer', es: 'Desarrollador freelance' },
    company: 'S3i Printing Solutions',
    dates: { en: 'Jan 2024 – Jun 2024', es: 'Ene 2024 – Jun 2024' },
    current: false,
    desc: {
      en: 'Inventory and asset ERP with KPIs, sales tracking and role-based security. Deployed on Azure; today it is the company’s main system.',
      es: 'ERP de inventario y activos con KPIs, seguimiento de ventas y seguridad por roles. Desplegado en Azure; hoy es el sistema principal de la empresa.',
    },
    stack: ['Angular', 'C#', 'SQL Server', 'Azure'],
    sample: false,
  },
  {
    role: { en: 'Software Development Intern', es: 'Practicante de desarrollo' },
    company: 'NICE',
    dates: { en: 'Dec 2022 – Jul 2023', es: 'Dic 2022 – Jul 2023' },
    current: false,
    desc: {
      en: 'Internal tools that pull data from Jira and Confluence to automate manual work, plus manual and automated QA.',
      es: 'Herramientas internas que traen datos de Jira y Confluence para automatizar trabajo manual, además de QA manual y automatizado.',
    },
    stack: ['C#', 'Blazor', '.NET', 'Selenium'],
    sample: false,
  },
];

export const STUDIES: {
  degree: { institution: string; years: string };
  bootcamp: { institution: string; years: string };
  certifications: Bilingual[];
  englishLevel: string;
} = {
  degree: { institution: 'Universidad Católica Boliviana', years: '2018 – 2024' },
  bootcamp: { institution: 'Blumbit', years: '2024' },
  certifications: [
    {
      en: 'Azure Fundamentals (AZ-900) · Microsoft',
      es: 'Azure Fundamentals (AZ-900) · Microsoft',
    },
    { en: 'Agentic AI Developer (GH-600) · GitHub', es: 'Agentic AI Developer (GH-600) · GitHub' },
    { en: 'Front-End Developer · Meta', es: 'Front-End Developer · Meta' },
    { en: 'n8n and AI Automation · Udemy', es: 'n8n y automatización con IA · Udemy' },
    { en: 'Model Context Protocol (MCP) · Udemy', es: 'Model Context Protocol (MCP) · Udemy' },
  ],
  englishLevel: 'C1',
};
