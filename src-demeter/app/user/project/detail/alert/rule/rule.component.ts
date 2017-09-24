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
    this.broadcast.next(this.rule);
    this.lgModal.hide();
  }

  cancel() {
    this.lgModal.hide();
  }
}
