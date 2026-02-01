import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TasksFacade, StatusFilter } from './tasks.facade';
import { FeatureFlagsService } from '../../core/feature-flags/feature-flags.service';
import { map } from 'rxjs';
import { TaskEditorModalComponent } from './components/task-editor.modal';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {
  readonly vm$ = this.facade.vm$;
  readonly flags$ = this.flags.flags$;
  readonly categoriesEnabled$ = this.flags.flags$.pipe(map(f => f.categoriesEnabled));
  readonly bulkEnabled$ = this.flags.flags$.pipe(map(f => f.bulkActionsEnabled));

  constructor(
    public facade: TasksFacade,
    private modal: ModalController,
    private alerts: AlertController,
    private flags: FeatureFlagsService,
  ) {}

  trackById = (_: number, item: any) => item.id;

  onStatusChange(v: unknown) {
    const value = (v === 'active' || v === 'completed' || v === 'all') ? (v as StatusFilter) : 'all';
    this.facade.setStatusFilter(value);
  }

  async openAddModal(): Promise<void> {
    const m = await this.modal.create({ component: TaskEditorModalComponent });
    await m.present();
    const { data } = await m.onDidDismiss<{ title?: string; categoryId?: string | null }>();
    if (data?.title) await this.facade.add(data.title, data.categoryId ?? null);
  }

  async confirmDelete(id: string) {
    const alert = await this.alerts.create({
      header: 'Eliminar tarea',
      message: '¿Seguro que deseas eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.facade.remove(id) }
      ]
    });
    await alert.present();
  }

  async confirmClearCompleted() {
    const alert = await this.alerts.create({
      header: 'Limpiar completadas',
      message: 'Se eliminarán todas las tareas completadas.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Continuar', role: 'destructive', handler: () => this.facade.clearCompleted() }
      ]
    });
    await alert.present();
  }
}
