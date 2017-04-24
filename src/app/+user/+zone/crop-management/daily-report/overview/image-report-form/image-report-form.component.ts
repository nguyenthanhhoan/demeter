import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AppSettings } from '../../../../../../app.settings';
declare var moment: any;
@Component({
  selector: 'image-report-form',
  templateUrl: './image-report-form.component.html'
})
export class ImageReportFormComponent {

  @Input() imageReportTypes;
  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  imageReport: any = {};
  mode: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  open(imageReport) {
    this.lgModal.show();
    if (imageReport) {
      this.mode = 'edit';
      Object.assign(this.imageReport, imageReport);
    } else {
      this.mode = 'add';
      Object.keys(this.imageReport).forEach((key) => { delete this.imageReport[key]; });
      this.imageReport.src = 'assets/img/demo/s1.jpg';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.imageReport);
  }

}
