import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'fuel-form',
  templateUrl: './fuel-form.component.html'
})
export class FuelFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  fuelReport: any = {};
  mode: string;

  constructor() {
  }

  open(fuelReport) {
    this.lgModal.show();
    Object.keys(this.fuelReport).forEach((key) => { delete this.fuelReport[key]; });
    if (fuelReport) {
      this.mode = 'edit';
      Object.assign(this.fuelReport, fuelReport);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.fuelReport);
  }

}
