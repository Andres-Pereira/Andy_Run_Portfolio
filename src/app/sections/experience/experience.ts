import { Component, inject } from '@angular/core';
import { JOBS, STUDIES } from '../../core/content/experience';
import { LINKS } from '../../core/content/profile';
import { I18nService } from '../../core/i18n/i18n.service';
import { Button } from '../../ui/button/button';
import { Card } from '../../ui/card/card';
import { Pill } from '../../ui/pill/pill';
import { SampleTag } from '../../ui/sample-tag/sample-tag';
import { SectionHeader } from '../../ui/section-header/section-header';

@Component({
  selector: 'ar-experience',
  imports: [Button, Card, Pill, SampleTag, SectionHeader],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  protected readonly i18n = inject(I18nService);
  protected readonly jobs = JOBS;
  protected readonly studies = STUDIES;
  protected readonly links = LINKS;
}
