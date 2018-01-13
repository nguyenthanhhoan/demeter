import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  imageObject: any = {};
  mode: string;
  constructor() { }

  ngOnInit() {
  }

  open(imageObject) {
    this.lgModal.show();
    if (imageObject) {
      this.mode = 'edit';
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate(){

  }
}
