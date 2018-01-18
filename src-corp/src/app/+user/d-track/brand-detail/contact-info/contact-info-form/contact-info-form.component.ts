import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'contact-info-form',
  templateUrl: './contact-info-form.component.html'
})
export class ContactInfoFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();
  @Input('brand') brandModel: any = {};

  // harvesting: any = {};
  mode: string;

  constructor() {
  }

  open(brand) {
    this.lgModal.show();
    Object.keys(this.brandModel).forEach((key) => { delete this.brandModel[key]; });
    if (brand) {
      this.mode = 'edit';
      Object.assign(this.brandModel, brand);
    } else {
      this.mode = 'add';
    }
  }

  onClose(event) {
    if (event === 'close') {
      this.lgModal.hide();
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    // this.resolve.emit(this.harvesting);
  }

}
