import { Inject, Injectable } from '@angular/core';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoryId } from '../models/task.model';
import { CATEGORIES_REPOSITORY } from '../../core/di/repository.tokens';

@Injectable({ providedIn: 'root' })
export class UpsertCategoryUseCase {
  constructor(@Inject(CATEGORIES_REPOSITORY) private repo: CategoriesRepository) {}
  execute(name: string, id?: CategoryId) {
    const trimmed = name.trim();
    if (!trimmed) return Promise.resolve();
    return this.repo.upsert(trimmed, id);
  }
}
