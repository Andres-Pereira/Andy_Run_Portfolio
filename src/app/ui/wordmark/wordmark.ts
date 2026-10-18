import { Component, computed, input } from '@angular/core';
import { Runner } from '../runner/runner';

/** Andy.Run(runner) — logo principal en Geist 600. Trail solo desde 32px. */
@Component({
  selector: 'ar-wordmark',
  imports: [Runner],
  template: `
    <span class="sr-only">Andy.Run</span>
    <span aria-hidden="true">Andy</span><span class="method" aria-hidden="true">.Run</span>
    <span aria-hidden="true">(</span
    ><ar-runner size="0.78em" [trail]="showTrail()" [running]="running()" /><span aria-hidden="true"
      >)</span
    >
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--font-sans);
      font-weight: var(--wordmark-weight);
      letter-spacing: var(--wordmark-tracking);
      line-height: 1;
      color: var(--bone);
      white-space: nowrap;
    }
    .method {
      color: var(--ember);
    }
  `,
  host: { '[style.font-size.px]': 'size()' },
})
export class Wordmark {
  readonly size = input(48);
  readonly running = input(false);
  readonly trail = input(true);

  protected readonly showTrail = computed(() => this.trail() && this.size() >= 32);
}
