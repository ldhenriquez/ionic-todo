import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class LocalStorageDataSource {
  private ready = false;
  constructor(private storage: Storage) {}

  private async ensureReady() {
    if (this.ready) return;
    await this.storage.create();
    this.ready = true;
  }

  async get<T>(key: string, fallback: T): Promise<T> {
    await this.ensureReady();
    const v = await this.storage.get(key);
    return (v ?? fallback) as T;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.ensureReady();
    await this.storage.set(key, value);
  }
}
