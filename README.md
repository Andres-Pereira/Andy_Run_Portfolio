# Andy_Run_Portfolio

Portfolio page for project showcase, freelance and experience.

**Live:** https://andy-run.vercel.app

One-page, bilingual (EN/ES) portfolio for Andrés Pereira, Full-Stack .NET Developer, built on the Andy.Run design system.

## Stack

- Angular 22 (standalone components, signals, zoneless) with static prerendering (SSG)
- Plain CSS with design tokens as custom properties; mobile breakpoint at 760px
- Signal Forms for the contact form, delivered through [Web3Forms](https://web3forms.com)
- Vitest for unit tests; deployed on Vercel

## Development

```bash
npm install
npm start          # dev server at http://localhost:4200
npm test           # unit tests
npm run build      # production build in dist/andy-run/browser
```

`npm run brand-assets` regenerates the Open Graph image, favicons and Apple touch icon from the HTML templates in `scripts/brand-assets` using a local Chrome install.

## Content

- Copy (EN/ES): `src/app/core/i18n/dict.ts`
- Projects, experience, services and links: `src/app/core/content/`
- Site URL and SEO identity: `src/app/core/content/site.ts`

Items flagged with `sample: true` are placeholders to replace before launch.
