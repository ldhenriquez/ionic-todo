import { CategoryId } from './task.model';

export interface Category {
  id: CategoryId;
  name: string;
  color?: string;
  createdAt: number;
  updatedAt: number;
}
