import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { PROJECTS } from '../../core/content/projects';
import { ProjectType } from '../../core/content/types';
import { Dict } from '../../core/i18n/dict';
import { I18nService } from '../../core/i18n/i18n.service';
import { Button } from '../../ui/button/button';
import { Pill } from '../../ui/pill/pill';
import { SectionHeader } from '../../ui/section-header/section-header';

type Filter = 'all' | ProjectType;

const FILTERS: { id: Filter; label: keyof Dict }[] = [
  { id: 'all', label: 'fAll' },
  { id: 'web', label: 'fWeb' },
  { id: 'ai', label: 'fAi' },
  { id: 'landing', label: 'fLanding' },
];

const TYPE_LABEL: Record<ProjectType, keyof Dict> = { web: 'tWeb', ai: 'tAi', landing: 'tLanding' };

/** Desplazamiento de los botones prev/next (prototipo). */
export const SCROLL_STEP = 420;

@Component({
  selector: 'ar-projects',
  imports: [Button, Pill, SectionHeader],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly i18n = inject(I18nService);
  protected readonly typeLabel = TYPE_LABEL;

  protected readonly filter = signal<Filter>('all');

  protected readonly filters = computed(() =>
    FILTERS.map((f) => ({
      ...f,
      count: f.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.type === f.id).length,
    })),
  );

  protected readonly projects = computed(() => {
    const f = this.filter();
    return f === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === f);
  });

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  /** Solo los links externos abren en pestaña nueva. */
  protected external(url: string): '_blank' | null {
    return /^https?:\/\//.test(url) ? '_blank' : null;
  }

  protected pick(f: Filter): void {
    this.filter.set(f);
    this.track().nativeElement.scrollTo({ left: 0 });
  }

  protected scroll(dir: -1 | 1): void {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.track().nativeElement.scrollBy({
      left: dir * SCROLL_STEP,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }
}
