import { DeviceService } from '../../../../../core/api/services/device.service';
import { NotificationService } from '../../../../../core/services/notification.service';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

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
  @ViewChild('eventRuleModal') public eventRuleModal: any;
  constructor(private notificationService: NotificationService,
              private deviceService: DeviceService) {}

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

  addRule() {
    this.eventRuleModal.open()
    .subscribe((rule) => {
      this.device.events.push(rule);
    });
  }

  remove(event) {
    let { events } = this.device;
    const index = events.indexOf(event);
    events.splice(index, 1);
  }

  updateDevice() {
    // TODO: Handle loading
    // this.isRequesting = true;
    let { device } = this;
    let submitDevice: any = {
      uuid: device.uuid,
      name: device.name,
      mode: 'event'
    };
    submitDevice.events = JSON.stringify(device.events);
    this.deviceService.put(submitDevice)
    .subscribe(() => {
      this.notificationService.showMessage('Update to device successfully!');
    }, () => {
      // this.isRequesting = false;
    });
  }
}
