import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'personal-feedback-form',
  templateUrl: './personal-feedback-form.component.html',
  styleUrls: ['./personal-feedback-form.component.scss']
})
export class PersonalFeedbackFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  mediaFeedback: any = {};
  mode: string;

  @Input()
  type: string;

  constructor() {
  }

  open(mediaFeedback) {
    this.lgModal.show();
    // Object.keys(this.harvesting).forEach((key) => { delete this.harvesting[key]; });
    if (mediaFeedback) {
      this.mode = 'edit';
      // Object.assign(this.harvesting, harvesting);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    // this.resolve.emit(this.harvesting);
  }

  fileChange(event) {
    // let fileList: FileList = event.target.files;
    // if (this.type === 'edit') {
    //   let submitImage: any;
    //   if (fileList.length > 0) {
    //     submitImage = fileList[0];
    //   }
    //   this.zoneService.updateImage(this.zone.id, submitImage)
    //   .subscribe((image) => {
    //     this.zone.image = image;
    //     this.notificationService.showMessage('Change image successfully!');
    //   });
    // } else {
    //   if (fileList.length > 0) {
    //     this.zone.image = fileList[0];
    //   }
    //   this.readURL(event.target);
    // }
  }

}
