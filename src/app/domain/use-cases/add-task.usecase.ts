import { Inject, Injectable } from '@angular/core';
import { TasksRepository } from '../repositories/tasks.repository';
import { CategoryId } from '../models/task.model';
import { TASKS_REPOSITORY } from '../../core/di/repository.tokens';

@Injectable({ providedIn: 'root' })
export class AddTaskUseCase {
  constructor(@Inject(TASKS_REPOSITORY) private repo: TasksRepository) {}
  execute(title: string, categoryId?: CategoryId | null) {
    const trimmed = title.trim();
    if (!trimmed) return Promise.resolve();
    return this.repo.add(trimmed, categoryId ?? null);
  }
}
