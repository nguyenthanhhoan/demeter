import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'pesticide-form',
  templateUrl: './pesticide-form.component.html'
})
export class PesticideFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  pesticide: any = {};
  mode: string;

  constructor() {
  }

  open(pesticide) {
    this.lgModal.show();
    Object.keys(this.pesticide).forEach((key) => { delete this.pesticide[key]; });
    if (pesticide) {
      this.mode = 'edit';
      Object.assign(this.pesticide, pesticide);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.pesticide);
  }

}
