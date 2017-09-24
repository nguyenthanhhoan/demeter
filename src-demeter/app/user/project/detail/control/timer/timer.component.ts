import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../../core/services/notification.service';
import { DeviceService } from '../../../../../core/api/services/device.service';

declare var moment: any;
declare var uuid: any;
@Component({
  selector: 'control-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input()
  device: any = {};

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
      if (!device.timer_start_date) {
        device.timer_start_date = moment().format(AppSettings.date_time_format.date_iso);
      }
      if (!device.timer_end_date) {
        device.timer_end_date = moment().add(7, 'day').format(AppSettings.date_time_format.date_iso);
      }
      if (!device.timer_daily_schedule) {
        device.timer_daily_schedule = [];
      }
    }
  }

  addSchedule() {
    this.device.timer_daily_schedule.push({
      id: uuid()
    });
  }

  remove(schedule) {
    const { timer_daily_schedule } = this.device;
    const index = timer_daily_schedule.indexOf(schedule);
    timer_daily_schedule.splice(index, 1);
  }

  updateDevice() {
    // TODO: Handle loading
    // this.isRequesting = true;
    let { device } = this;
    let submitDevice: any = {
      uuid: device.uuid,
      name: device.name,
      mode: 'timer'
    };
    submitDevice.timer_start_date = device.timer_start_date;
    submitDevice.timer_end_date = device.timer_end_date;
    submitDevice.timer_daily_schedule = JSON.stringify(device.timer_daily_schedule);
    this.deviceService.put(submitDevice)
    .subscribe(() => {
      this.notificationService.showMessage('Update to device successfully!');
    }, () => {
      // this.isRequesting = false;
    });
  }
}
