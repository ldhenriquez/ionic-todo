import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '../shared/shared-ui.module';

import { TasksPage } from './tasks.page';
import { TaskItemComponent } from './components/task-item.component';
import { TaskEditorModalComponent } from './components/task-editor.modal';

const routes: Routes = [{ path: '', component: TasksPage }];

@NgModule({
  declarations: [TasksPage, TaskItemComponent, TaskEditorModalComponent],
  imports: [CommonModule, FormsModule, IonicModule, SharedUiModule, RouterModule.forChild(routes)],
})
export class TasksPageModule {}
