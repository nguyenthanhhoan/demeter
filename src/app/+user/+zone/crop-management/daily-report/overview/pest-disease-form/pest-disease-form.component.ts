import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

declare var moment: any;
@Component({
  selector: 'pest-disease-form',
  templateUrl: './pest-disease-form.component.html',
})
export class PestDiseaseFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  pest_disease: any = {};
  mode: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  open(pest_disease) {
    this.lgModal.show();
    if (pest_disease) {
      this.mode = 'edit';
      Object.assign(this.pest_disease, pest_disease);
    } else {
      this.mode = 'add';
      Object.keys(this.pest_disease).forEach((key) => { delete this.pest_disease[key]; });
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.pest_disease);
  }

}
