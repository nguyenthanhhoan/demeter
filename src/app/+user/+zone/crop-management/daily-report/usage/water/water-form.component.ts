import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'water-form',
  templateUrl: './water-form.component.html'
})
export class WaterFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  water: any = {};
  mode: string;

  constructor() {
  }

  open(water) {
    this.lgModal.show();
    Object.keys(this.water).forEach((key) => { delete this.water[key]; });
    if (water) {
      this.mode = 'edit';
      Object.assign(this.water, water);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.water);
  }

}
