import { Bilingual, Job } from './types';

export const JOBS: Job[] = [
  {
    role: 'Full-Stack .NET Developer',
    company: 'Meta-DAO',
    dates: { en: 'Mar 2024 – Present', es: 'Mar 2024 – Actualidad' },
    current: true,
    desc: {
      en: 'I build and maintain ERP and CRM modules, from the SQL Server model to the Angular UI.',
      es: 'Construyo y mantengo módulos ERP y CRM, desde el modelo en SQL Server hasta la interfaz en Angular.',
    },
    stack: ['C#', '.NET', 'ASP.NET Web Forms', 'Angular', 'SQL Server'],
    sample: true, // la descripción es Sample
  },
  {
    role: { en: '.NET Developer', es: 'Desarrollador .NET' },
    company: { en: 'Company name', es: 'Empresa' },
    dates: '20XX – 2024',
    current: false,
    desc: {
      en: 'Admin and sales systems for internal clients.',
      es: 'Sistemas administrativos y de ventas para clientes internos.',
    },
    stack: ['C#', 'Blazor', 'SQL Server'],
    sample: true,
  },
  {
    role: { en: 'Web Developer', es: 'Desarrollador web' },
    company: { en: 'Company name', es: 'Empresa' },
    dates: '20XX – 20XX',
    current: false,
    desc: {
      en: 'Landing pages and company sites.',
      es: 'Landing pages y sitios corporativos para empresas.',
    },
    stack: ['HTML', 'CSS', 'JS'],
    sample: true,
  },
];

// Los títulos de estudios (eduSys, eduUx, english…) están en el diccionario; aquí solo los datos.
export const STUDIES: {
  degree: { institution: string; years: string; sample: boolean };
  diploma: { years: string; sample: boolean };
  /** Sin `name` se muestra el placeholder certName del diccionario. */
  certifications: { name?: Bilingual; sample: boolean }[];
  englishLevel: string;
} = {
  degree: { institution: 'Universidad Católica San Pablo', years: '20XX – 20XX', sample: true },
  diploma: { years: '20XX', sample: true },
  certifications: [{ sample: true }, { sample: true }],
  englishLevel: 'C1',
};
