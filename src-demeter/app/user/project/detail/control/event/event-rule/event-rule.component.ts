import { Component, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'event-rule',
  templateUrl: './event-rule.component.html',
  styleUrls: ['./event-rule.component.scss']
})
export class EventRuleComponent {
  @Input()
  sensors: any = [];
  @ViewChild('lgModal')
  lgModal: any;
  event: any = { };
  private broadcast: Subject<any>;
  constructor() {}

  open(event) {
    if (typeof event === 'undefined') {
      this.event = {
        lower_limit_value: 1,
        upper_limit_value: 1,
        sensor_id: ''
      };
    }
    this.broadcast = new Subject();
    this.lgModal.show();
    return this.broadcast;
  }

  add() {
    this.broadcast.next(this.event);
    this.lgModal.hide();
  }

  isInValidState() {
    const { event } = this;
    if (event.sensor_id === undefined || event.sensor_id.length === 0) {
      return true;
    }
    if ((event.upper_limit === undefined || event.upper_limit === null)
      && (event.lower_limit === undefined || event.lower_limit === null)) {
      return true;
    }
    return false;
  }

  toggleValue(event, prop) {
    if (event[prop] === 1) {
      event[prop] = 0;
    } else {
      event[prop] = 1;
    }
  }

  cancel() {
    this.lgModal.hide();
  }
}
