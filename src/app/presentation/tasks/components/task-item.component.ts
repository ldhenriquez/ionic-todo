import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../domain/models/category.model';
import { Task } from '../../../domain/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Input() categoryName: string = 'Sin categoría';
  @Input() categories: Category[] = [];
  @Input() categoriesEnabled: boolean = true;

  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() categoryChange = new EventEmitter<string | null>();

  onCategoryChange(v: string | null | undefined) {
    this.categoryChange.emit(v ?? null);
  }
}
