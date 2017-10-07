import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'fertilizer-form',
  templateUrl: './fertilizer-form.component.html'
})
export class FertilizerFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  fertilizer: any = {};
  mode: string;

  constructor() {
  }

  open(fertilizer) {
    this.lgModal.show();
    Object.keys(this.fertilizer).forEach((key) => { delete this.fertilizer[key]; });
    if (fertilizer) {
      this.mode = 'edit';
      Object.assign(this.fertilizer, fertilizer);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.fertilizer);
  }

}
