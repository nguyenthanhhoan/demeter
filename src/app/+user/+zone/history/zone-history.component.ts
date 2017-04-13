import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { ZoneService } from '../../../core/services/zone.service';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  templateUrl: './zone-history.component.html',
  styleUrls: ['./zone-history.component.css']
})
export class ZoneHistoryComponent implements OnInit {

  @Input()
  zone: any;
  project_id: number;
  charts: any[];
  filter: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService,
              private mockDataService: MockDataService) {

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];
    if (id) {
      this.zone = {
        image: "assets/img/cau-dat/cau-dat-farm.png"
      };
      this.zoneService.getOne(project_id, id).subscribe(data => {
        Object.assign(this.zone, data);
      });
    } else {
      Object.assign(this.zone, {
        image: "assets/img/cau-dat/cau-dat-farm.png"
      });
    }

    let stats = this.mockDataService.initStat(30);
    this.charts = [{
      title: stats.series.temp,
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.temp]
      },
      options: stats.options
    }, {
      title: stats.series.humid,
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.humid]
      },
      options: stats.options
    }, {
      title: stats.series.light,
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.light]
      },
      options: stats.options
    }, {
      title: stats.series.pressure,
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.pressure]
      },
      options: stats.options
    }, {
      title: stats.series.pH,
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.pH]
      },
      options: stats.options
    }, {
      title: stats.series.ec,
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.ec]
      },
      options: stats.options
    }];
    this.filter = {};
  }

}
