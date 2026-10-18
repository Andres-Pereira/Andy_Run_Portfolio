import { Component, inject } from '@angular/core';
import { CURRENTLY, STATS } from '../../core/content/profile';
import { I18nService } from '../../core/i18n/i18n.service';
import { Card } from '../../ui/card/card';
import { Runner } from '../../ui/runner/runner';
import { SampleTag } from '../../ui/sample-tag/sample-tag';
import { SectionHeader } from '../../ui/section-header/section-header';
import { Stat } from '../../ui/stat/stat';

@Component({
  selector: 'ar-about',
  imports: [Card, Runner, SampleTag, SectionHeader, Stat],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly i18n = inject(I18nService);
  protected readonly stats = STATS;
  protected readonly currently = CURRENTLY;
}
