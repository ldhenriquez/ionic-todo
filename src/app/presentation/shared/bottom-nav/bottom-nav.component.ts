import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FeatureFlagsService } from '../../../core/feature-flags/feature-flags.service';

type BottomRoute = 'tasks' | 'categories';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
  readonly categoriesEnabled$ = this.flags.flags$.pipe(map(f => f.categoriesEnabled));

  readonly active$: Observable<BottomRoute> = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    startWith(null),
    map(() => (this.router.url.includes('/categories') ? 'categories' : 'tasks')),
  );

  constructor(private router: Router, private flags: FeatureFlagsService) {}

  // ion-segment emits SegmentValue which can be string | number | null | undefined
  // (depending on framework typings). We normalize to string and whitelist routes.
  navigate(value: string | number | null | undefined): void {
    if (value === null || value === undefined) return;
    const raw = String(value);
    const v: BottomRoute = raw === 'categories' ? 'categories' : 'tasks';
    void this.router.navigateByUrl(`/${v}`);
  }
}
