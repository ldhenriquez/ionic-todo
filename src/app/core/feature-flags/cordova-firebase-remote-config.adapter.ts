import { Injectable } from '@angular/core';
import { RemoteConfigAdapter } from './remote-config.adapter';

declare global {
  interface Window { cordova?: any; }
}

@Injectable({ providedIn: 'root' })
export class CordovaFirebaseRemoteConfigAdapter implements RemoteConfigAdapter {
  private get rc(): any | undefined {
    return window.cordova?.plugins?.firebase?.config;
  }

  isSupported(): boolean {
    return !!this.rc;
  }

  async fetchAndActivate(): Promise<void> {
    if (!this.rc) return;
    // cordova-plugin-firebase-config API
    await this.rc.fetchAndActivate();
  }

  async getBoolean(key: string): Promise<boolean> {
    if (!this.rc) return false;
    return !!(await this.rc.getBoolean(key));
  }
}
