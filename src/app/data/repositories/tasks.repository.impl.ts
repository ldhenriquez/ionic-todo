import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageDataSource } from '../datasources/local-storage.datasource';
import { TasksRepository } from '../../domain/repositories/tasks.repository';
import { CategoryId, Task, TaskId } from '../../domain/models/task.model';
import { uuid } from '../../core/utils/uuid';

const KEY = 'tasks_v1';
const PERSIST_DEBOUNCE_MS = 250;

@Injectable({ providedIn: 'root' })
export class TasksRepositoryImpl implements TasksRepository {
  private readonly subject = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.subject.asObservable();

  private persistTimer: any | undefined;

  constructor(private ds: LocalStorageDataSource) {}

  async load(): Promise<void> {
    const items = await this.ds.get<Task[]>(KEY, []);
    // ensure sorted for stable UX
    this.subject.next([...items].sort((a, b) => b.updatedAt - a.updatedAt));
  }

  private schedulePersist(next: Task[]) {
    this.subject.next(next);
    if (this.persistTimer) clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => this.ds.set(KEY, next), PERSIST_DEBOUNCE_MS);
  }

  async add(title: string, categoryId?: CategoryId | null): Promise<void> {
    const now = Date.now();
    const next: Task = {
      id: uuid(),
      title,
      completed: false,
      categoryId: categoryId ?? null,
      createdAt: now,
      updatedAt: now,
    };
    const curr = this.subject.value;
    this.schedulePersist([next, ...curr]);
  }

  async toggle(taskId: TaskId): Promise<void> {
    const now = Date.now();
    const next = this.subject.value.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed, updatedAt: now } : t
    );
    this.schedulePersist(next.sort((a, b) => b.updatedAt - a.updatedAt));
  }

  async remove(taskId: TaskId): Promise<void> {
    const next = this.subject.value.filter(t => t.id !== taskId);
    this.schedulePersist(next);
  }

  async setCategory(taskId: TaskId, categoryId?: CategoryId | null): Promise<void> {
    const now = Date.now();
    const next = this.subject.value.map(t =>
      t.id === taskId ? { ...t, categoryId: categoryId ?? null, updatedAt: now } : t
    );
    this.schedulePersist(next.sort((a, b) => b.updatedAt - a.updatedAt));
  }

  async clearCompleted(): Promise<void> {
    const next = this.subject.value.filter(t => !t.completed);
    this.schedulePersist(next);
  }

  async completeAll(): Promise<void> {
    const now = Date.now();
    const next = this.subject.value.map(t => t.completed ? t : { ...t, completed: true, updatedAt: now });
    this.schedulePersist(next.sort((a, b) => b.updatedAt - a.updatedAt));
  }
}
