import { TIMEPICKER_CONTROL_VALUE_ACCESSOR } from 'ng2-bootstrap/timepicker/timepicker.component';
import { AppUtils } from '../../../../../app.utils';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AppSettings } from '../../../../../app.settings';

@Component({
  selector: 'effective-period',
  templateUrl: './effective-period.component.html',
  styleUrls: ['./effective-period.component.scss']
})
export class EffectivePeriodComponent implements OnInit, OnChanges {

  effectiveFrom: any = {};
  effectiveTo: any = {};
  valid: boolean = true;
  datepickerOpts = {
    dateFormat: AppSettings.date_time_format.date_picker_date_format
  };

  @Input()
  private fromTime: string;
  @Input()
  private toTime: string;
  private initialized: boolean;

  ngOnInit() {
    this.initEffectivePeriod();
    this.initialized = false;
  }

  ngOnChanges() {
    this.initEffectivePeriod();
  }

  initEffectivePeriod() {
    if (this.initialized) {
      return;
    }
    if (this.fromTime) {
      this.effectiveFrom = AppUtils.convertDateTimeFromIso8601Format(this.fromTime);
      this.initialized = true;
    }
    if (this.toTime) {
      this.effectiveTo = AppUtils.convertDateTimeFromIso8601Format(this.toTime);
      this.initialized = true;
    }
  }

  getEffectivePeriod() {
    let from_time = AppUtils.convertDateTimeToIso8601Format(this.effectiveFrom);
    let to_time = AppUtils.convertDateTimeToIso8601Format(this.effectiveTo);
    if ((typeof from_time === 'undefined' && typeof to_time === 'undefined') ||
        (typeof from_time !== 'undefined' && typeof to_time !== 'undefined')) {

      this.valid = true;
      return {
        from_time: from_time,
        to_time: to_time
      };
    } else {
      this.valid = false;
      return false;
    }
  }
}
