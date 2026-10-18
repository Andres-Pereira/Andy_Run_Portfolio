import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormField,
  form,
  pattern,
  required,
  requiredError,
  validate,
} from '@angular/forms/signals';
import { ContactService } from '../../core/contact/contact.service';
import { LINKS } from '../../core/content/profile';
import { I18nService, fmt } from '../../core/i18n/i18n.service';
import { Button } from '../../ui/button/button';
import { Isotype } from '../../ui/isotype/isotype';
import { Texture } from '../../ui/texture/texture';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

const EMPTY: ContactMessage = { name: '', email: '', message: '' };

/** Regla del prototipo: \S+@\S+\.\S+ */
export const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/** Nombre y mensaje obligatorios (solo espacios no cuenta, como el trim() del prototipo). */
const notBlank = ({ value }: { value: () => string }) => (value().trim() ? null : requiredError());

@Component({
  selector: 'ar-contact',
  imports: [Button, FormField, Isotype, Texture],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly i18n = inject(I18nService);
  protected readonly links = LINKS;
  private readonly injector = inject(Injector);
  private readonly contact = inject(ContactService);

  protected readonly model = signal<ContactMessage>({ ...EMPTY });
  protected readonly contactForm = form(this.model, (p) => {
    validate(p.name, notBlank);
    validate(p.message, notBlank);
    required(p.email);
    pattern(p.email, EMAIL_PATTERN);
  });

  protected readonly error = signal<'errFill' | 'errEmail' | 'errSend' | null>(null);
  protected readonly sending = signal(false);
  protected readonly sent = signal(false);
  /** Honeypot: checkbox invisible para humanos. */
  protected readonly botcheck = signal(false);

  protected readonly thanks = computed(() =>
    fmt(this.i18n.t().thanks, { n: this.model().name.trim().split(' ')[0] ?? '' }),
  );

  private readonly thanksTitle = viewChild<ElementRef<HTMLElement>>('thanksTitle');
  private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.sending()) return;
    const f = this.contactForm;
    if (f.name().invalid() || f.message().invalid()) return this.error.set('errFill');
    if (f.email().invalid()) return this.error.set('errEmail');

    this.error.set(null);
    this.sending.set(true);
    try {
      await this.contact.send({
        ...this.model(),
        lang: this.i18n.lang(),
        botcheck: this.botcheck(),
      });
      this.sent.set(true);
      this.focusAfterRender(() => this.thanksTitle());
    } catch {
      // Se conservan los datos para reintentar.
      this.error.set('errSend');
    } finally {
      this.sending.set(false);
    }
  }

  protected errorText(key: 'errFill' | 'errEmail' | 'errSend'): string {
    return fmt(this.i18n.t()[key], { email: this.links.email });
  }

  protected reset(): void {
    this.model.set({ ...EMPTY });
    this.sent.set(false);
    this.focusAfterRender(() => this.nameInput());
  }

  private focusAfterRender(target: () => ElementRef<HTMLElement> | undefined): void {
    afterNextRender(() => target()?.nativeElement.focus(), { injector: this.injector });
  }
}
