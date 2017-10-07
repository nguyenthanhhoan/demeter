import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'work-hour-form',
  templateUrl: './work-hour-form.component.html'
})
export class WorkHourFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  workHour: any = {};
  mode: string;

  constructor() {
  }

  open(workHour) {
    this.lgModal.show();
    Object.keys(this.workHour).forEach((key) => { delete this.workHour[key]; });
    if (workHour) {
      this.mode = 'edit';
      Object.assign(this.workHour, workHour);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.workHour);
  }

}
