import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppSettings } from '../../../../../app.settings';

declare var moment: any;
@Component({
  selector: 'control-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input()
  device: any = {};
  ngOnInit() {
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
    this.device.timer_daily_schedule.push({});
  }
}
