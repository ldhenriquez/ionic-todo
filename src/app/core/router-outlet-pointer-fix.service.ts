import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Workaround for an intermittent Chromium/Linux issue where Ionic's stacked
 * pages inside <ion-router-outlet> keep receiving pointer events (even when
 * they are visually "invisible"), causing the whole UI to feel unclickable.
 *
 * We defensively force pointer-events: none on hidden pages and keep
 * pointer-events enabled only for the currently visible page.
 */
@Injectable({ providedIn: 'root' })
export class RouterOutletPointerFixService {
  private observers: MutationObserver[] = [];
  private started = false;

  constructor(
    private router: Router,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  start(): void {
    if (this.started) return;
    this.started = true;

    // Run outside Angular to avoid triggering change detection on every DOM mutation.
    this.zone.runOutsideAngular(() => {
      // Apply once on startup
      queueMicrotask(() => this.applyFix());

      // Apply after every navigation
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => {
          // Wait for the new view to be attached
          setTimeout(() => this.applyFix(), 0);
        });

      // Watch for new outlets being added (rare, but possible)
      const rootObserver = new MutationObserver(() => this.applyFix());
      rootObserver.observe(this.doc.documentElement, { childList: true, subtree: true });
      this.observers.push(rootObserver);
    });
  }

  private applyFix(): void {
    const outlets = Array.from(this.doc.querySelectorAll('ion-router-outlet')) as HTMLElement[];
    outlets.forEach((outlet) => this.patchOutlet(outlet));
  }

  private patchOutlet(outlet: HTMLElement): void {
    // Attach a per-outlet observer once
    if (!(outlet as any).__pointerFixObserverAttached) {
      (outlet as any).__pointerFixObserverAttached = true;

      const root = (outlet as any).shadowRoot as ShadowRoot | undefined;
      const target = root ?? outlet;
      const obs = new MutationObserver(() => this.enforcePointerEvents(outlet));
      obs.observe(target, { attributes: true, childList: true, subtree: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
      this.observers.push(obs);
    }

    this.enforcePointerEvents(outlet);
  }

  private enforcePointerEvents(outlet: HTMLElement): void {
    const root = (outlet as any).shadowRoot as ShadowRoot | undefined;
    const scope: ParentNode = root ?? outlet;

    // Ionic pages inside the outlet
    const pages = Array.from(scope.querySelectorAll('.ion-page')) as HTMLElement[];
    if (!pages.length) return;

    // A page is considered hidden if Ionic marked it as such, or if aria-hidden is true.
    pages.forEach((page) => {
      const cls = page.classList;
      const ariaHidden = page.getAttribute('aria-hidden') === 'true';
      const hidden =
        ariaHidden ||
        cls.contains('ion-page-hidden') ||
        cls.contains('ion-page-invisible') ||
        cls.contains('ion-page-inactive');

      // If hidden pages are still "on top" they can capture clicks.
      // Force them to ignore pointer events.
      page.style.pointerEvents = hidden ? 'none' : 'auto';
    });
  }
}
