import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AppSettings } from '../../../app.settings';
import { ZoneService } from '../../../core/services/zone.service';

declare var moment: any;

@Component({
  selector: 'app-zone-summary-pane',
  templateUrl: './zone-summary-pane.component.html',
  styleUrls: ['./zone-summary-pane.component.css']
})
export class ZoneSummaryPaneComponent implements OnInit, DoCheck {

  @Input()
  zone: any

  oldZone: any = {}

  //'list' or 'detail' page
  @Input()
  mode: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
  }

  ngOnInit() {
    if (this.zone && this.zone.id) {
      this.calculateProgress();
    }
  }

  calculateProgress() {
    let start_date = moment(this.zone.start_date, AppSettings.date_time_format.date);
    let end_date = moment(this.zone.end_date, AppSettings.date_time_format.date);

    let current_date = moment().startOf('day');
    let percent = 0;
    if (!start_date._isValid || !end_date._isValid || current_date.isBefore(start_date)) {
      percent = 0;
    } else if (current_date.isAfter(end_date)) {
      percent = 100;
    } else {
      let startToCurrent = current_date.diff(start_date, 'days');
      let startToEnd = end_date.diff(start_date, 'days');
      if (startToEnd < 0) {
        percent = 0;
      } else {
        percent = startToCurrent / startToEnd * 100;
      }
    }
    this.zone.percent = percent;
  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.calculateProgress();
      this.oldZone = this.zone;
    }
  }

}
