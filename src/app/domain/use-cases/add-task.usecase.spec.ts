import { AddTaskUseCase } from './add-task.usecase';
import { TasksRepository } from '../repositories/tasks.repository';
import { of } from 'rxjs';

class FakeRepo implements TasksRepository {
  tasks$ = of([]);
  load = async () => {};
  add = async (title: string) => { this.lastAdded = title; };
  toggle = async () => {};
  remove = async () => {};
  setCategory = async () => {};
  clearCompleted = async () => {};
  completeAll = async () => {};
  lastAdded: string | null = null;
}

describe('AddTaskUseCase', () => {
  it('should trim and ignore empty titles', async () => {
    const repo = new FakeRepo();
    const uc = new AddTaskUseCase(repo);
    await uc.execute('   ');
    expect(repo.lastAdded).toBeNull();

    await uc.execute('  hello ');
    expect(repo.lastAdded).toBe('hello');
  });
});
