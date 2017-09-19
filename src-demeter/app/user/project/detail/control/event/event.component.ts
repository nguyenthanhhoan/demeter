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
  events: any[] = [{

  }, {

  }];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // this.checkAndInitData();
  }

  ngOnChanges() {
    // this.checkAndInitData();
  }

  

  toggleValue(event, prop) {
    if (event[prop] === 1) {
      event[prop] = 0;
    } else {
      event[prop] = 1;
    }
  }

  addEvent() {
    this.events.push({

    });
  }
  confirmRemove(event) {
    this.notificationService.confirm('Do you want to remove this event?')
    .subscribe(() => {
      const index = this.events.indexOf(event);
      this.events.splice(index, 1);
    });
  }
}
