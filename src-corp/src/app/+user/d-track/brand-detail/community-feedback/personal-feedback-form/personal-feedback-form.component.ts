import { Component, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
declare var $: any;

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

  constructor(private el: ElementRef) {
  }

  open(mediaFeedback) {
    this.lgModal.show();
     Object.keys(this.mediaFeedback).forEach((key) => { delete this.mediaFeedback[key]; });
    if (mediaFeedback) {
      this.mode = 'edit';
       Object.assign(this.mediaFeedback, mediaFeedback);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    // this.resolve.emit(this.harvesting);
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (this.type === 'edit') {
      let submitImage: any;
      if (fileList.length > 0) {
        submitImage = fileList[0];
      }
      // this.zoneService.updateImage(this.zone.id, submitImage)
      // .subscribe((image) => {
      //   this.zone.image = image;
      //   this.notificationService.showMessage('Change image successfully!');
      // });
    } else {
      if (fileList.length > 0) {
        this.mediaFeedback.avatar = fileList[0];
      }
      this.readURL(event.target);
    }
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $('.upload-preview').css('background-image', 'url(' + e.target['result'] + ')');
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

}
