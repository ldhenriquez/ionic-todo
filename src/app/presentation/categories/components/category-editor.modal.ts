import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-editor-modal',
  templateUrl: './category-editor.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEditorModalComponent {
  @Input() name: string = '';

  constructor(private modal: ModalController) {}

  close() { return this.modal.dismiss(); }

  save() {
    const n = (this.name ?? '').trim();
    if (!n) return;
    return this.modal.dismiss({ name: n }, 'confirm');
  }
}
