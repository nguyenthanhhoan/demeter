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

  weed_types = [
    'Annual bluegrass',
    'Canada thistle',
    'Large crabgrass'
  ];

  disease_types = [
    'Alfalfa mosaic virus',
    'Bacterial leaf spot',
    'Bacterial soft rot',
    'Black root rot',
    'Chrisanthemum ray blight'
  ];

  pest_types = [
    'Alfalfa looper',
    'Bean thrips',
    'Cotton aphid',
    'Crane fly',
    'European earwig',
    'Fall armyworm'
  ];

  sub_types = [];

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

  changeType() {
    switch (this.pest_disease.type) {
      case 'Disease':
        this.sub_types = this.disease_types;
        break;
      case 'Pests':
        this.sub_types = this.pest_types;
        break;
      case 'Weeds':
        this.sub_types = this.weed_types;
        break;
      default:
        break;
    }
  }

  updateSubType(value) {
    this.pest_disease.sub_type = value;
  }

}
