import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { ZoneService } from '../../../core/services/zone.service';

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
              private zoneService: ZoneService) {

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

    let stats = this.initStat(30);
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

  initStat(dateCount) {
    var stats = {
      series: {
        temp: ['Nhiệt độ'],
        humid: ['Độ ẩm không khí'],
        light: ['Ánh sáng'],
        pressure: ['Áp suất'],
        pH: ['pH'],
        ec: ['EC']
      },
      data: {
        temp: [],
        humid: [], // humidity - độ ẩm
        light: [],
        pressure: [],
        pH: [],
        ec: []
      },
      labels: [],
      options: {
          lineSmooth: false,
          fullWidth: true,
          chartPadding: {
              top: 15,
              right: 45,
              bottom: 5,
              left: 10
          },
      }
    };

    stats.labels = [];

    function randomInt(value, dt) {
      var min = value - dt,
          max = value + dt;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomFloat(value, dt) {
      return randomInt(value * 10, dt * 10) / 10;
    }
    for (var i = 0; i < dateCount; i++) {
        var date = new Date();
        date.setDate(date.getDate() + i);
        date = new Date();
        date.setDate(date.getDate() - dateCount + i + 1);
        stats.labels.push(date.getDate() + '/' + (date.getMonth() + 1));

        stats.data.temp[i]   = randomInt(22, 5);
        stats.data.humid[i]  = randomInt(75, 15);
        stats.data.light[i]  = randomInt(475, 125);
        stats.data.pressure[i]  = randomInt(475, 125);
        stats.data.pH[i]     = randomFloat(6.2, 0.5);
        stats.data.ec[i]     = randomFloat(1.1, 0.4);
    }

    return stats;
  }

}
