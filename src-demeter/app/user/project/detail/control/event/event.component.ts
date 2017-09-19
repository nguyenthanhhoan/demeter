import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../core/services/notification.service';

declare var moment: any;
@Component({
  selector: 'control-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnChanges {
  @Input()
  device: any = {};
  @Input()
  sensors: any = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.checkAndInitData();
  }

  ngOnChanges() {
    this.checkAndInitData();
  }

  checkAndInitData() {
    // Check device have been loaded
    let { device } = this;
    if (this.device && this.device.uuid) {
      if (!device.events) {
        device.events = [];
      }
    }
  }

  toggleValue(event, prop) {
    if (event[prop] === true) {
      event[prop] = false;
    } else {
      event[prop] = true;
    }
  }

  addEvent() {
    this.device.events.push({
      lower_limit_value: true,
      upper_limit_value: true
    });
  }
  confirmRemove(event) {
    let { events } = this.device;
    this.notificationService.confirm('Do you want to remove this event?')
    .subscribe(() => {
      const index = events.indexOf(event);
      events.splice(index, 1);
    });
  }
}
