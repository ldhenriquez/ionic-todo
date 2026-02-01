import { Observable } from 'rxjs';
import { CategoryId, Task, TaskId } from '../models/task.model';

export interface TasksRepository {
  readonly tasks$: Observable<Task[]>;
  load(): Promise<void>;
  add(title: string, categoryId?: CategoryId | null): Promise<void>;
  toggle(taskId: TaskId): Promise<void>;
  remove(taskId: TaskId): Promise<void>;
  setCategory(taskId: TaskId, categoryId?: CategoryId | null): Promise<void>;
  clearCompleted(): Promise<void>;
  completeAll(): Promise<void>;
}
