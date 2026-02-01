import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CordovaFirebaseRemoteConfigAdapter } from './cordova-firebase-remote-config.adapter';

type Flags = {
  categoriesEnabled: boolean;
  bulkActionsEnabled: boolean;
};

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  private readonly flagsSubject = new BehaviorSubject<Flags>({
    categoriesEnabled: environment.featureFlags.categories,
    bulkActionsEnabled: environment.featureFlags.bulkActions,
  });

  readonly flags$ = this.flagsSubject.asObservable();

  constructor(private adapter: CordovaFirebaseRemoteConfigAdapter) {}

  snapshot(): Flags {
    return this.flagsSubject.value;
  }

  async init(): Promise<void> {
    // If Cordova Remote Config isn't available (web), keep environment defaults.
    if (!this.adapter.isSupported()) return;

    // Default behavior before remote fetch (safe defaults)
    await this.adapter.fetchAndActivate();

    const categoriesEnabled = await this.adapter.getBoolean('ff_categories');
    const bulkActionsEnabled = await this.adapter.getBoolean('ff_bulk_actions');

    // If backend keys missing, keep current defaults.
    this.flagsSubject.next({
      categoriesEnabled: categoriesEnabled ?? this.flagsSubject.value.categoriesEnabled,
      bulkActionsEnabled: bulkActionsEnabled ?? this.flagsSubject.value.bulkActionsEnabled,
    });
  }
}
