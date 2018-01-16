import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'history-vision-mission-form',
  templateUrl: './history-vision-mission-form.component.html',
  styleUrls: ['./history-vision-mission-form.component.scss']
})
export class HistoryVisionMissionFormComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Input('data') data: any;
  constructor() { }

  ngOnInit() {
  }

  open(item) {
    this.lgModal.show();
  }
}
