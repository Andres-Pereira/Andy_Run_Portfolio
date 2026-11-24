import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { WEB3FORMS } from '../content/profile';
import { Lang } from '../i18n/dict';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  lang: Lang;
  botcheck: boolean;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

export const SEND_TIMEOUT_MS = 15_000;

@Service()
export class ContactService {
  private readonly http = inject(HttpClient);

  async send({ name, email, message, lang, botcheck }: ContactPayload): Promise<void> {
    const body = {
      access_key: WEB3FORMS.accessKey,
      subject: `New message from ${name.trim()} · andy.run`,
      from_name: 'Andy.Run portfolio',
      replyto: email.trim(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      lang,
      botcheck,
    };

    const res = await firstValueFrom(
      this.http
        .post<Web3FormsResponse>(WEB3FORMS.endpoint, body, {
          headers: { Accept: 'application/json' },
        })
        .pipe(timeout(SEND_TIMEOUT_MS)),
    );
    if (!res.success) throw new Error(res.message ?? 'Web3Forms rejected the submission');
  }
}
