import { Component, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'alert-rule',
  templateUrl: './rule.component.html'
})
export class RuleComponent {
  @Input()
  devices: any = [];
  @ViewChild('lgModal')
  lgModal: any;
  rule: any = {
    device: {}
  };
  private broadcast: Subject<any>;
  constructor() {}

  open(rule) {
    if (typeof rule === 'undefined') {
      this.rule = {
        device: '',
        condition: 'gt',
        value: 0
      };
    }
    this.broadcast = new Subject();
    this.lgModal.show();
    return this.broadcast;
  }

  add() {
    // For the case select ON/OFF. Need to parse the value
    this.rule.value = parseInt(this.rule.value, 10);
    this.broadcast.next(this.rule);
    this.lgModal.hide();
  }

  cancel() {
    this.lgModal.hide();
  }
}
