import { Component, Type, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Button } from './button/button';
import { Card } from './card/card';
import { Isotype } from './isotype/isotype';
import { Runner, RUN_FRAME_MS } from './runner/runner';
import { Stat } from './stat/stat';
import { Wordmark } from './wordmark/wordmark';

// jsdom no implementa matchMedia.
const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: reduce && q.includes('reduce'),
    media: q,
  }));

const render = <T>(cmp: Type<T>, inputs: Record<string, unknown> = {}) => {
  const fixture = TestBed.createComponent(cmp);
  for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
  fixture.detectChanges();
  return fixture;
};

const headY = (el: HTMLElement) => el.querySelector('circle')!.getAttribute('cy');

describe('brand marks', () => {
  beforeEach(() => stubReducedMotion(false));
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('Isotype shows the trail only at 48px or more', () => {
    expect(render(Isotype, { size: 47 }).nativeElement.querySelectorAll('rect').length).toBe(0);
    expect(render(Isotype, { size: 48 }).nativeElement.querySelectorAll('rect').length).toBe(3);
  });

  it('Wordmark drops the trail below 32px and keeps an accessible name', () => {
    const small = render(Wordmark, { size: 24 }).nativeElement as HTMLElement;
    expect(small.querySelectorAll('rect').length).toBe(0);
    expect(small.querySelector('.sr-only')?.textContent).toBe('Andy.Run');
    expect(render(Wordmark, { size: 32 }).nativeElement.querySelectorAll('rect').length).toBe(3);
  });

  it('Runner steps through 4 frames every 110ms while running', () => {
    vi.useFakeTimers();
    const fixture = render(Runner, { running: true });
    TestBed.tick();
    const el = fixture.nativeElement as HTMLElement;
    const ys = new Set([headY(el)]);
    for (let i = 0; i < 4; i++) {
      vi.advanceTimersByTime(RUN_FRAME_MS);
      fixture.detectChanges();
      ys.add(headY(el));
    }
    expect(ys.size).toBeGreaterThan(1);
  });

  it('Runner stays still under prefers-reduced-motion', () => {
    stubReducedMotion(true);
    vi.useFakeTimers();
    const fixture = render(Runner, { running: true });
    TestBed.tick();
    const before = headY(fixture.nativeElement);
    vi.advanceTimersByTime(RUN_FRAME_MS * 3);
    fixture.detectChanges();
    expect(headY(fixture.nativeElement)).toBe(before);
  });
});

@Component({
  imports: [Button],
  template: `
    <a arButton [size]="size()" href="#contact" arrow>Go</a>
    <button arButton variant="glass" type="submit">Send</button>
  `,
})
class ButtonHost {
  readonly size = signal<'sm' | 'lg'>('sm');
}

describe('Button', () => {
  it('keeps native elements and applies variant/size classes', () => {
    const el = render(ButtonHost).nativeElement as HTMLElement;
    const a = el.querySelector('a')!;
    expect(a.getAttribute('href')).toBe('#contact');
    expect(a.className).toContain('primary');
    expect(a.className).toContain('sm');
    expect(a.querySelector('[aria-hidden="true"]')?.textContent).toBe('→');
    const button = el.querySelector('button')!;
    expect(button.type).toBe('submit');
    expect(button.className).toContain('glass');
    expect(button.textContent?.trim()).toBe('Send');
  });
});

describe('Stat and Card', () => {
  it('Stat maps desktop and mobile sizes to classes', () => {
    const el = render(Stat, { value: '6+', size: 'lg', sizeMobile: 'md' })
      .nativeElement as HTMLElement;
    expect(el.className).toBe('d-lg m-md');
  });

  it('Card renders eyebrow and heading only when given', () => {
    const bare = render(Card).nativeElement as HTMLElement;
    expect(bare.querySelector('.eyebrow')).toBeNull();
    const full = render(Card, { eyebrow: 'Degree', heading: 'Systems Engineering', glow: true })
      .nativeElement as HTMLElement;
    expect(full.querySelector('.eyebrow')?.textContent).toBe('Degree');
    expect(full.querySelector('.title')?.textContent).toBe('Systems Engineering');
    expect(full.querySelector('.glow')).not.toBeNull();
    expect(full.hasAttribute('title')).toBe(false);
  });
});
