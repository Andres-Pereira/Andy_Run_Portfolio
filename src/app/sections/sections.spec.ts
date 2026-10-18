import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WEB3FORMS } from '../core/content/profile';
import { App } from '../app';
import { Contact } from './contact/contact';
import { Hero, bootTimeline } from './hero/hero';
import { Projects } from './projects/projects';

const text = (el: Element | null) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

describe('App shell', () => {
  it('starts with a skip link to the main content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const skip = el.querySelector('a.skip') as HTMLAnchorElement;
    expect(el.querySelector('a, button')).toBe(skip);
    expect(skip.getAttribute('href')).toBe('#main');
    expect(el.querySelector('main#main')).not.toBeNull();
  });

  it('renders every section in the handoff order', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const ids = [...fixture.nativeElement.querySelectorAll('[id]')]
      .map((e: Element) => e.id)
      .filter((id: string) => !id.endsWith('-title') && id !== 'main');
    expect(ids).toEqual([
      'top',
      'about',
      'experience',
      'projects',
      'services',
      'clients',
      'contact',
    ]);
  });
});

describe('Hero boot', () => {
  it('types, starts the runner and reveals the steps in order in about 2 seconds', () => {
    const t = bootTimeline();
    expect(t[0]).toEqual({ at: 300, typed: 1 });
    expect(t.find((e) => e.typed === 8)?.at).toBe(685);
    expect(t.find((e) => e.runOn)?.at).toBe(740);
    expect(t.filter((e) => e.step).map((e) => [e.step, e.at])).toEqual([
      [1, 1090],
      [2, 1190],
      [3, 1330],
      [4, 1470],
      [5, 1610],
      [6, 1810],
      [7, 1950],
    ]);
  });

  it('keeps all copy in the DOM, shows the headline right away and reveals the rest on click', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(text(el.querySelector('h1'))).toBe('Building quality products.Shipping ASAP.');
    // El h1 es el LCP: visible desde el primer render, no participa del boot
    expect(el.querySelector('h1')!.classList).not.toContain('boot');
    expect(el.querySelector('.line')!.classList).not.toContain('on');
    expect(text(el.querySelector('.sr-only'))).toBe('Andy.Run');

    (el.querySelector('.terminal') as HTMLElement).click();
    fixture.detectChanges();
    expect(el.querySelector('.line')!.classList).toContain('on');
    expect(el.querySelector('.actions')!.classList).toContain('on');
    expect(text(el.querySelector('.typed'))).toBe('Andy.Run');
    expect(el.querySelector('ar-isotype')).not.toBeNull();
  });
});

describe('Projects', () => {
  it('shows counts, filters cards and renders buttons only for existing links', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const filters = [...el.querySelectorAll('.filters button')];
    expect(filters.map(text)).toEqual(['All6', 'Web apps2', 'AI agents2', 'Landing pages2']);
    expect(el.querySelectorAll('.card').length).toBe(6);

    (filters[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    const cards = [...el.querySelectorAll('.card')];
    expect(cards.length).toBe(2);
    expect(filters[2].getAttribute('aria-pressed')).toBe('true');
    // "WhatsApp support agent" no tiene repo: solo Live demo
    expect([...cards[0].querySelectorAll('.links a')].map(text)).toEqual(['Live demo→']);
  });
});

describe('Contact form', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  const setup = async () => {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const type = (selector: string, value: string) => {
      const input = el.querySelector(selector) as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const fillValid = () => {
      type('input[autocomplete=name]', 'Ana María');
      type('input[type=email]', 'ana@empresa.com');
      type('textarea', 'Necesito un CRM');
    };
    const send = async () => {
      el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
      await fixture.whenStable();
    };
    /** Responde la petición pendiente a Web3Forms y deja que la UI se actualice. */
    const respond = async (body: object | 'network-error') => {
      const req = http.expectOne(WEB3FORMS.endpoint);
      if (body === 'network-error') req.error(new ProgressEvent('error'));
      else req.flush(body);
      // firstValueFrom resuelve en un microtask posterior: un tick antes de estabilizar
      await new Promise((r) => setTimeout(r));
      await fixture.whenStable();
      return req;
    };
    return { fixture, el, type, fillValid, send, respond };
  };

  it('requires name and message (blank spaces do not count)', async () => {
    const { el, type, send } = await setup();
    type('input[autocomplete=name]', '   ');
    type('input[type=email]', 'ana@empresa.com');
    type('textarea', 'Hola');
    await send();
    expect(text(el.querySelector('[role=alert]'))).toBe('Add your name and a short message.');
    http.expectNone(WEB3FORMS.endpoint);
  });

  it('validates the email and clears the error while typing', async () => {
    const { fixture, el, type, send } = await setup();
    type('input[autocomplete=name]', 'Ana');
    type('input[type=email]', 'ana@empresa');
    type('textarea', 'Hola');
    await send();
    expect(text(el.querySelector('[role=alert]'))).toBe('That email does not look right.');

    type('input[type=email]', 'ana@empresa.com');
    await fixture.whenStable();
    expect(el.querySelector('[role=alert]')).toBeNull();
  });

  it('posts to Web3Forms, disables the button while sending and shows the success state', async () => {
    const { fixture, el, fillValid, send, respond } = await setup();
    fillValid();
    void send();
    fixture.detectChanges();
    const button = el.querySelector('.send') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(text(button)).toBe('Sending…');

    const req = await respond({ success: true });
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toMatchObject({
      access_key: WEB3FORMS.accessKey,
      name: 'Ana María',
      email: 'ana@empresa.com',
      replyto: 'ana@empresa.com',
      message: 'Necesito un CRM',
      subject: 'New message from Ana María · andy.run',
      lang: 'en',
      botcheck: false,
    });
    expect(text(el.querySelector('.thanks h3'))).toBe('Thanks, Ana. Message received.');
  });

  it('keeps the data and shows an error when sending fails', async () => {
    const { el, fillValid, send, respond } = await setup();
    fillValid();
    void send();
    await respond('network-error');
    expect(text(el.querySelector('[role=alert]'))).toBe(
      'Something went wrong. Try again or email me at hello@andy.run.',
    );
    expect((el.querySelector('input[autocomplete=name]') as HTMLInputElement).value).toBe(
      'Ana María',
    );
    expect((el.querySelector('.send') as HTMLButtonElement).disabled).toBe(false);
  });

  it('treats success: false from Web3Forms as an error', async () => {
    const { el, fillValid, send, respond } = await setup();
    fillValid();
    void send();
    await respond({ success: false, message: 'Invalid access key' });
    expect(el.querySelector('.thanks')).toBeNull();
    expect(text(el.querySelector('[role=alert]'))).toContain('Something went wrong');
  });

  it('can start over after a successful send', async () => {
    const { fixture, el, fillValid, send, respond } = await setup();
    fillValid();
    void send();
    await respond({ success: true });
    (el.querySelector('.again') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(el.querySelector('form')).not.toBeNull();
    expect((el.querySelector('input[autocomplete=name]') as HTMLInputElement).value).toBe('');
  });
});
