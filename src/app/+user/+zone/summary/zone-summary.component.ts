import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { ZoneService } from '../../../core/services/zone.service';


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

var data = {
  "Line": {
    "labels": [
      "10/03",
      "11/03",
      "12/03",
      "13/03",
      "14/03",
      "14/03",
      "14/03"
    ],
    "series": [
      [
        12,
        9,
        7,
        8,
        5,
        8,
        9
      ],
      [
        2,
        1,
        3.5,
        7,
        3,
        4,
        5
      ]
    ]
  }
};

@Component({
  templateUrl: './zone-summary.component.html',
  styleUrls: ['./zone-summary.component.css']
})
export class ZoneSummaryComponent implements OnInit {

  zone: any = {}
  project: {} = {}
  setting: {} = {}
  project_id: number;
  chart: Chart;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
    this.chart = {
      type: 'Line',
      data: data['Line']
    };
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
        Object.assign(this.project, this.zone.project);
        Object.assign(this.setting, this.zone.setting);
      });
    } else {
      Object.assign(this.zone, {
        image: "assets/img/cau-dat/cau-dat-farm.png"
      });
    }
  }

}
