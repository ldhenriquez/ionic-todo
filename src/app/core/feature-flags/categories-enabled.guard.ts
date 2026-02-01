import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { FeatureFlagsService } from './feature-flags.service';

@Injectable({ providedIn: 'root' })
export class CategoriesEnabledGuard implements CanMatch {
  constructor(private flags: FeatureFlagsService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    const enabled = this.flags.snapshot().categoriesEnabled;
    if (!enabled) {
      // Tabs live under /tabs/... so redirect to the default tab route.
      this.router.navigateByUrl('/tabs/tasks');
      return false;
    }
    return true;
  }
}
