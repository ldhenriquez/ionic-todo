import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FeatureFlagsService } from './feature-flags/feature-flags.service';
import { CategoriesRepositoryImpl } from '../data/repositories/categories.repository.impl';
import { TasksRepositoryImpl } from '../data/repositories/tasks.repository.impl';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(
    private platform: Platform,
    private flags: FeatureFlagsService,
    private tasksRepo: TasksRepositoryImpl,
    private categoriesRepo: CategoriesRepositoryImpl,
  ) {}

  async init(): Promise<void> {
    await this.platform.ready();

    // Load data early for a fast first paint
    await Promise.all([
      this.categoriesRepo.load(),
      this.tasksRepo.load(),
    ]);

    // Feature flags after storage is ready; still during init for deterministic routing
    await this.flags.init();
  }
}
