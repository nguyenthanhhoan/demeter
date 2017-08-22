import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
declare var moment: any;

@Component({
  selector: 'dmt-date-filter',
  templateUrl: './dmt-date-filter.component.html',
  styleUrls: ['./dmt-date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  dates = [];
  activeDate = {};

  constructor() {
  }

  ngOnInit() {
    this.initDateFilter();
  }

  initDateFilter() {
    this.dates = [];
    let today_date = new Date();
    today_date.setHours(0, 0, 0, 0);
    let today = moment(today_date);
    this.dates.push({
      date: today.format(AppSettings.date_time_format.date_iso),
      date_display: today.format('DD MMM, ddd')
    });
    this.activeDate = this.dates[0];
    for (let i = 1; i < 7; i++) {
      let newDate = today.subtract(1, 'days');
      this.dates.push({
        date: newDate.format(AppSettings.date_time_format.date_iso),
        date_display: newDate.format('DD MMM, ddd')
      });
    }
  }

  setDate(date) {
    this.activeDate = date;
  }

}
