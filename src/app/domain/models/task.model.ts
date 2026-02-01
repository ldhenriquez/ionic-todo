export type TaskId = string;
export type CategoryId = string;

export interface Task {
  id: TaskId;
  title: string;
  completed: boolean;
  categoryId?: CategoryId | null;
  createdAt: number;
  updatedAt: number;
}
