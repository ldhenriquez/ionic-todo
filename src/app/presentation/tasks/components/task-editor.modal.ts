import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CATEGORIES_REPOSITORY } from '../../../core/di/repository.tokens';
import { FeatureFlagsService } from '../../../core/feature-flags/feature-flags.service';
import { CategoriesRepository } from '../../../domain/repositories/categories.repository';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-editor-modal',
  templateUrl: './task-editor.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditorModalComponent {
  title = '';
  categoryId: string | null = null;

  readonly categories$ = this.categoriesRepo.categories$;
  readonly categoriesEnabled$ = this.flags.flags$.pipe(map(f => f.categoriesEnabled));

  constructor(
    private modal: ModalController,
    @Inject(CATEGORIES_REPOSITORY) private categoriesRepo: CategoriesRepository,
    private flags: FeatureFlagsService,
  ) {}

  close() { return this.modal.dismiss(); }

  save() {
    const t = this.title.trim();
    if (!t) return;
    return this.modal.dismiss({ title: t, categoryId: this.categoryId }, 'confirm');
  }
}
