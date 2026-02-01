import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CategoriesEnabledGuard } from '../../core/feature-flags/categories-enabled.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksPageModule),
      },
      {
        path: 'categories',
        canMatch: [CategoriesEnabledGuard],
        loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule),
      },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [TabsPage],
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
})
export class TabsPageModule {}
