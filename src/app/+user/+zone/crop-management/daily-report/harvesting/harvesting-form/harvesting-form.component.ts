import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'harvesting-form',
  templateUrl: './harvesting-form.component.html'
})
export class HarvestingFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  harvesting: any = {};
  mode: string;

  constructor() {
  }

  open(harvesting) {
    this.lgModal.show();
    Object.keys(this.harvesting).forEach((key) => { delete this.harvesting[key]; });
    if (harvesting) {
      this.mode = 'edit';
      Object.assign(this.harvesting, harvesting);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.harvesting);
  }

}
