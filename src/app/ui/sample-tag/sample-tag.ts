import { Component } from '@angular/core';

@Component({
  selector: 'ar-sample-tag',
  template: `Sample`,
  styles: `
    :host {
      display: inline-block;
      align-self: flex-start;
      padding: 5px 9px;
      border: 1px solid rgba(255, 196, 107, 0.4);
      border-radius: var(--radius-pill);
      font: 500 11px/1 var(--font-code);
      letter-spacing: var(--tr-label);
      text-transform: uppercase;
      color: var(--glow);
    }
    :host(.inline) {
      margin-right: 8px;
      padding: 3px 8px;
      vertical-align: 2px;
    }
  `,
})
export class SampleTag {}
