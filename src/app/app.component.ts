import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutletPointerFixService } from './core/router-outlet-pointer-fix.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly pointerFix: RouterOutletPointerFixService) {
    // We always use <ion-router-outlet> (single outlet) so pages get the correct
    // Ionic layout (.ion-page) and we avoid click-blocking overlays.
    setTimeout(() => this.pointerFix.start(), 0);
  }
}
