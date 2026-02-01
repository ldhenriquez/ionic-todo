import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeatureFlagsService } from '../../core/feature-flags/feature-flags.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {
  readonly categoriesEnabled$ = this.flags.flags$.pipe(map(f => f.categoriesEnabled));
  constructor(private flags: FeatureFlagsService) {}
}
