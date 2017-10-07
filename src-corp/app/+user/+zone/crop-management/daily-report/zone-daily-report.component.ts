import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import * as Chartist from 'chartist';

import { AppSettings } from '../../../../app.settings';
import {  } from '../../../../core/services/zone.service';

declare var moment: any;
@Component({
  templateUrl: './zone-daily-report.component.html',
  styleUrls: ['./zone-daily-report.component.css']
})
export class ZoneDailyReportComponent implements OnInit {

  zone = {};
  project_id: number;
  zone_id: number;

  dates = [];
  activeDate = {};
  state = {
    tabs: {
      activeTab: 0
    }
  };
  path: string;

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    let needToLoad = true;
    this.store.select('zone')
    .takeWhile(() => {
      return (needToLoad);
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        let { zone } = zoneModel;
        this.zone_id = zone.id;
        this.project_id = zone.project.id;
        this.path = `user/project/${this.project_id}/zone/${this.project_id}/crop-management/daily-report/`;
        this.zone = zone;
        this.initDateFilter();
        needToLoad = false;
      }
    });
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
