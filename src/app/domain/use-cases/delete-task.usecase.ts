import { Inject, Injectable } from '@angular/core';
import { TasksRepository } from '../repositories/tasks.repository';
import { TaskId } from '../models/task.model';
import { TASKS_REPOSITORY } from '../../core/di/repository.tokens';

@Injectable({ providedIn: 'root' })
export class DeleteTaskUseCase {
  constructor(@Inject(TASKS_REPOSITORY) private repo: TasksRepository) {}
  execute(id: TaskId) { return this.repo.remove(id); }
}
