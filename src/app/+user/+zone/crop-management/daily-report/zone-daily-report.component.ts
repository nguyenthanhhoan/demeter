import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import { AppSettings } from '../../../../app.settings';
import { ZoneService } from '../../../../core/services/zone.service';

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
    this.zone_id = +this.route.snapshot.params['id'];
    this.project_id = +this.route.snapshot.params['project_id'];
    this.path = `user/project/${this.project_id}/zone/${this.project_id}/daily-report/`;
    this.zoneService.getOne(this.project_id, this.zone_id).subscribe(data => {
      Object.assign(this.zone, data);
    });
    this.initDateFilter();
  }

  initDateFilter() {
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
