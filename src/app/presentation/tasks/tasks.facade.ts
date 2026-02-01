import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CATEGORIES_REPOSITORY, TASKS_REPOSITORY } from '../../core/di/repository.tokens';
import { CategoriesRepository } from '../../domain/repositories/categories.repository';
import { TasksRepository } from '../../domain/repositories/tasks.repository';
import { AddTaskUseCase } from '../../domain/use-cases/add-task.usecase';
import { ToggleTaskUseCase } from '../../domain/use-cases/toggle-task.usecase';
import { DeleteTaskUseCase } from '../../domain/use-cases/delete-task.usecase';
import { CategoryId } from '../../domain/models/task.model';

export type StatusFilter = 'all' | 'active' | 'completed';

@Injectable({ providedIn: 'root' })
export class TasksFacade {
  private readonly statusFilterSubject = new BehaviorSubject<StatusFilter>('all');
  readonly statusFilter$ = this.statusFilterSubject.asObservable();

  private readonly categoryFilterSubject = new BehaviorSubject<CategoryId | 'all'>('all');
  readonly categoryFilter$ = this.categoryFilterSubject.asObservable();

  private readonly querySubject = new BehaviorSubject<string>('');
  readonly query$ = this.querySubject.asObservable();

  readonly categories$ = this.categoriesRepo.categories$;
  readonly tasks$ = this.tasksRepo.tasks$;

  readonly vm$ = combineLatest([
    this.tasks$,
    this.categories$,
    this.statusFilter$,
    this.categoryFilter$,
    this.query$,
  ]).pipe(
    map(([tasks, categories, status, categoryId, query]) => {
      const q = query.trim().toLowerCase();

      const filtered = tasks.filter(t => {
        if (status === 'active' && t.completed) return false;
        if (status === 'completed' && !t.completed) return false;
        if (categoryId !== 'all' && (t.categoryId ?? null) !== categoryId) return false;
        if (q && !t.title.toLowerCase().includes(q)) return false;
        return true;
      });

      const byId = new Map(categories.map(c => [c.id, c]));
      return {
        tasks: filtered,
        categories,
        categoryLookup: byId,
        status,
        categoryId,
        query,
        counts: {
          total: tasks.length,
          active: tasks.filter(t => !t.completed).length,
          completed: tasks.filter(t => t.completed).length,
        }
      };
    })
  );

  constructor(
    @Inject(TASKS_REPOSITORY) private tasksRepo: TasksRepository,
    @Inject(CATEGORIES_REPOSITORY) private categoriesRepo: CategoriesRepository,
    private addTask: AddTaskUseCase,
    private toggleTask: ToggleTaskUseCase,
    private deleteTask: DeleteTaskUseCase,
  ) {}

  setStatusFilter(v: StatusFilter) { this.statusFilterSubject.next(v); }
  setCategoryFilter(v: CategoryId | 'all') { this.categoryFilterSubject.next(v); }
  setQuery(v: string) { this.querySubject.next(v); }

  add(title: string, categoryId?: CategoryId | null) { return this.addTask.execute(title, categoryId); }
  toggle(id: string) { return this.toggleTask.execute(id); }
  remove(id: string) { return this.deleteTask.execute(id); }
  setCategory(taskId: string, categoryId?: CategoryId | null) { return this.tasksRepo.setCategory(taskId, categoryId); }

  clearCompleted() { return this.tasksRepo.clearCompleted(); }
  completeAll() { return this.tasksRepo.completeAll(); }
}
