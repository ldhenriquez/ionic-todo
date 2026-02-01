import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => import('./presentation/tasks/tasks.module').then((m) => m.TasksPageModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./presentation/categories/categories.module').then((m) => m.CategoriesPageModule),
  },
  { path: '**', redirectTo: 'tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
