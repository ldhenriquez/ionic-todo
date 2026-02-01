import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoriesFacade } from './categories.facade';
import { CategoryEditorModalComponent } from './components/category-editor.modal';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage {
  readonly categories$ = this.facade.categories$;

  constructor(
    private modal: ModalController,
    private alerts: AlertController,
    public facade: CategoriesFacade
  ) {}

  async openCreate() {
    const m = await this.modal.create({ component: CategoryEditorModalComponent });
    await m.present();
    const { data } = await m.onDidDismiss<{ name?: string }>();
    if (data?.name) await this.facade.upsertCategory(data.name);
  }

  async openEdit(id: string, name: string) {
    const m = await this.modal.create({ component: CategoryEditorModalComponent, componentProps: { name } });
    await m.present();
    const { data } = await m.onDidDismiss<{ name?: string }>();
    if (data?.name) await this.facade.upsertCategory(data.name, id);
  }

  async confirmDelete(id: string) {
    const alert = await this.alerts.create({
      header: 'Eliminar categoría',
      message: 'Si la eliminas, las tareas quedarán "Sin categoría".',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.facade.deleteCategory(id) }
      ]
    });
    await alert.present();
  }

  trackById = (_: number, item: any) => item.id;
}
