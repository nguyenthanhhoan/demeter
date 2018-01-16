import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'media-feedback-form',
  templateUrl: './media-feedback-form.component.html'
})
export class MediaFeedbackFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  mediaFeedback: any = {};
  mode: string;

  constructor() {
  }

  open(mediaFeedback) {
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
