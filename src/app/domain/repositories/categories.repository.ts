import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryId } from '../models/task.model';

export interface CategoriesRepository {
  readonly categories$: Observable<Category[]>;
  load(): Promise<void>;
  upsert(name: string, id?: CategoryId): Promise<void>;
  remove(id: CategoryId): Promise<void>;
}
