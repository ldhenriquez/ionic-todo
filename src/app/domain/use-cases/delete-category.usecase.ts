import { Inject, Injectable } from '@angular/core';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoryId } from '../models/task.model';
import { CATEGORIES_REPOSITORY } from '../../core/di/repository.tokens';

@Injectable({ providedIn: 'root' })
export class DeleteCategoryUseCase {
  constructor(@Inject(CATEGORIES_REPOSITORY) private repo: CategoriesRepository) {}
  execute(id: CategoryId) { return this.repo.remove(id); }
}
