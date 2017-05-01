import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'machinery-form',
  templateUrl: './machinery-form.component.html'
})
export class MachineryFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  machineryReport: any = {};
  mode: string;

  constructor() {
  }

  open(machineryReport) {
    this.lgModal.show();
    Object.keys(this.machineryReport).forEach((key) => { delete this.machineryReport[key]; });
    if (machineryReport) {
      this.mode = 'edit';
      Object.assign(this.machineryReport, machineryReport);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.machineryReport);
  }

}
