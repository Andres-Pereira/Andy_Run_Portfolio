import { Component, computed, input } from '@angular/core';
import { Runner } from '../runner/runner';

@Component({
  selector: 'ar-isotype',
  imports: [Runner],
  template: `<span>(</span
    ><ar-runner size="0.78em" [trail]="showTrail()" [running]="running()" /><span>)</span>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--font-sans);
      font-weight: var(--iso-weight, 600);
      letter-spacing: -0.05em;
      line-height: 1;
      color: var(--bone);
    }
  `,
  host: {
    '[style.font-size.px]': 'size()',
    '[style.font-weight]': 'weight()',
    'aria-hidden': 'true',
  },
})
export class Isotype {
  readonly size = input<number>();
  readonly running = input(false);
  readonly trail = input(true);

  protected readonly showTrail = computed(() => {
    const size = this.size();
    return this.trail() && (size === undefined || size >= 48);
  });

  protected readonly weight = computed(() => {
    const size = this.size();
    return size === undefined ? null : size < 48 ? 700 : 600;
  });
}
