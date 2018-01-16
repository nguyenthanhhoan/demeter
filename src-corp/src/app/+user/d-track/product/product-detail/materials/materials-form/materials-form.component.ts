import { Component, OnInit , ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'materials-form',
  templateUrl: './materials-form.component.html',
  styleUrls: ['./materials-form.component.scss']
})
export class MaterialsFormComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  material: any = {};
  mode: string;
  constructor() { }

  ngOnInit() {
  }

  open(material) {
    this.lgModal.show();
    if (material) {
      this.mode = 'edit';
    } else {
      this.mode = 'add';
    }
  }
}
