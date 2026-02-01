import { Inject, Injectable } from '@angular/core';
import { CATEGORIES_REPOSITORY } from '../../core/di/repository.tokens';
import { CategoriesRepository } from '../../domain/repositories/categories.repository';
import { UpsertCategoryUseCase } from '../../domain/use-cases/upsert-category.usecase';
import { DeleteCategoryUseCase } from '../../domain/use-cases/delete-category.usecase';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  readonly categories$ = this.repo.categories$;

  constructor(
    @Inject(CATEGORIES_REPOSITORY) private repo: CategoriesRepository,
    private upsert: UpsertCategoryUseCase,
    private del: DeleteCategoryUseCase,
  ) {}

  upsertCategory(name: string, id?: string) { return this.upsert.execute(name, id); }
  deleteCategory(id: string) { return this.del.execute(id); }
}
