import { Component, input } from '@angular/core';

@Component({
  selector: 'ar-card',
  template: `
    @if (glow()) {
      <div class="glow" aria-hidden="true"></div>
    }
    <div class="inner">
      @if (eyebrow()) {
        <div class="eyebrow">{{ eyebrow() }}</div>
      }
      @if (heading()) {
        <div class="title">{{ heading() }}</div>
      }
      <div class="body" [class.spaced]="!!heading()"><ng-content /></div>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: var(--radius-xl);
      padding: var(--card-pad, 28px);
      background: var(--carbon);
      border: 1px solid var(--border-1);
      color: var(--bone);
      font-family: var(--font-sans);
    }
    .glow {
      position: absolute;
      left: 10%;
      right: 10%;
      bottom: -120px;
      height: 240px;
      border-radius: 50%;
      background: radial-gradient(closest-side, rgba(255, 90, 31, 0.5), transparent);
    }
    .inner {
      position: relative;
      height: 100%;
    }
    .eyebrow {
      margin-bottom: 14px;
      font-family: var(--font-code);
      font-size: 12px;
      letter-spacing: var(--tr-label);
      text-transform: uppercase;
      color: var(--flame);
    }
    .title {
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }
    .body {
      font-size: 15px;
      line-height: 1.55;
      color: var(--fg-2);
    }
    .body:empty {
      display: none;
    }
    .body.spaced {
      margin-top: 10px;
    }
  `,
})
export class Card {
  readonly eyebrow = input<string>();
  readonly heading = input<string>();
  readonly glow = input(false, { transform: (v: boolean | '') => v !== false });
}
