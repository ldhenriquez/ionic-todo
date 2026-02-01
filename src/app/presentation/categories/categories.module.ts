import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '../shared/shared-ui.module';
import { CategoriesPage } from './categories.page';
import { CategoryEditorModalComponent } from './components/category-editor.modal';

const routes: Routes = [{ path: '', component: CategoriesPage }];

@NgModule({
  declarations: [CategoriesPage, CategoryEditorModalComponent],
  imports: [CommonModule, FormsModule, IonicModule, SharedUiModule, RouterModule.forChild(routes)],
})
export class CategoriesPageModule {}
