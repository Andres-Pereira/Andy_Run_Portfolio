import { Component, inject } from '@angular/core';
import { LINKS } from '../../core/content/profile';
import { SERVICES } from '../../core/content/services';
import { I18nService } from '../../core/i18n/i18n.service';
import { Button } from '../../ui/button/button';
import { SectionHeader } from '../../ui/section-header/section-header';

@Component({
  selector: 'ar-services',
  imports: [Button, SectionHeader],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly i18n = inject(I18nService);
  protected readonly services = SERVICES;
  protected readonly links = LINKS;
}
