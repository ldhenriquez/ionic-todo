import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageDataSource } from '../datasources/local-storage.datasource';
import { CategoriesRepository } from '../../domain/repositories/categories.repository';
import { Category } from '../../domain/models/category.model';
import { CategoryId } from '../../domain/models/task.model';
import { uuid } from '../../core/utils/uuid';

const KEY = 'categories_v1';
const PERSIST_DEBOUNCE_MS = 250;

@Injectable({ providedIn: 'root' })
export class CategoriesRepositoryImpl implements CategoriesRepository {
  private readonly subject = new BehaviorSubject<Category[]>([]);
  readonly categories$ = this.subject.asObservable();
  private persistTimer: any | undefined;

  constructor(private ds: LocalStorageDataSource) {}

  async load(): Promise<void> {
    const items = await this.ds.get<Category[]>(KEY, []);
    this.subject.next([...items].sort((a, b) => a.name.localeCompare(b.name)));
  }

  private schedulePersist(next: Category[]) {
    this.subject.next(next);
    if (this.persistTimer) clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => this.ds.set(KEY, next), PERSIST_DEBOUNCE_MS);
  }

  async upsert(name: string, id?: CategoryId): Promise<void> {
    const now = Date.now();
    const curr = this.subject.value;

    if (!id) {
      const next: Category = { id: uuid(), name, createdAt: now, updatedAt: now };
      this.schedulePersist([...curr, next].sort((a, b) => a.name.localeCompare(b.name)));
      return;
    }

    const next = curr.map(c => c.id === id ? { ...c, name, updatedAt: now } : c);
    this.schedulePersist(next.sort((a, b) => a.name.localeCompare(b.name)));
  }

  async remove(id: CategoryId): Promise<void> {
    const next = this.subject.value.filter(c => c.id !== id);
    this.schedulePersist(next);
  }
}
