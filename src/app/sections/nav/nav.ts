import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { LANGS } from '../../core/i18n/dict';
import { Button } from '../../ui/button/button';
import { Wordmark } from '../../ui/wordmark/wordmark';

@Component({
  selector: 'ar-nav',
  imports: [Button, Wordmark],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly i18n = inject(I18nService);
  protected readonly langs = LANGS;
}
