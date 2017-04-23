import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AppSettings } from '../../../../../../app.settings';
declare var moment: any;
@Component({
  selector: 'irrigation-form',
  templateUrl: './irrigation-form.component.html'
})
export class IrrigationFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  irrigation: any = {};
  mode: string;

  irrigationTypes = [
    AppSettings.irrigationType.watering,
    AppSettings.irrigationType.watering_fertilizer
  ];

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  open(irrigation) {
    this.lgModal.show();
    if (irrigation) {
      this.mode = 'edit';
      Object.assign(this.irrigation, irrigation);
    } else {
      this.mode = 'add';
      Object.keys(this.irrigation).forEach((key) => { delete this.irrigation[key]; });
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.irrigation);
  }

}
