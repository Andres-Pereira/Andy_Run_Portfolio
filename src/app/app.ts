import { Component } from '@angular/core';
import { About } from './sections/about/about';
import { Clients } from './sections/clients/clients';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Nav } from './sections/nav/nav';
import { Projects } from './sections/projects/projects';
import { Services } from './sections/services/services';

// Orden del handoff: Hero → About → Experience → Projects → Services → Clients → Contact → Footer.
@Component({
  selector: 'app-root',
  imports: [About, Clients, Contact, Experience, Footer, Hero, Nav, Projects, Services],
  template: `
    <ar-nav />
    <main>
      <ar-hero />
      <ar-about />
      <ar-experience />
      <ar-projects />
      <ar-services />
      <ar-clients />
      <ar-contact />
    </main>
    <ar-footer />
  `,
})
export class App {}
