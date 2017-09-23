import { Subject } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent {
  @Input()
  devices: any = [];
  show: boolean = false;
  rule: any = {};
  private broadcast: Subject<any>;
  constructor() {}

  open(rule) {
    this.show = true;
    if (typeof rule === 'undefined') {
      this.rule = {
        device: '',
        condition: 'gt',
        value: 0
      };
    }
    this.broadcast = new Subject();
    return this.broadcast;
  }

  add() {
    this.broadcast.next(this.rule);
    this.show = false;
  }

  cancel() {
    this.show = false;
  }
}
