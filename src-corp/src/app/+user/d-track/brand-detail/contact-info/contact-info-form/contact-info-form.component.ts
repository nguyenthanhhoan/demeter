import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'contact-info-form',
  templateUrl: './contact-info-form.component.html'
})
export class ContactInfoFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  harvesting: any = {};
  mode: string;

  constructor() {
  }

  open(harvesting) {
    alert('oke');
    this.lgModal.show();
    // Object.keys(this.harvesting).forEach((key) => { delete this.harvesting[key]; });
    // if (harvesting) {
    //   this.mode = 'edit';
    //   Object.assign(this.harvesting, harvesting);
    // } else {
    //   this.mode = 'add';
    // }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    // this.resolve.emit(this.harvesting);
  }

}
