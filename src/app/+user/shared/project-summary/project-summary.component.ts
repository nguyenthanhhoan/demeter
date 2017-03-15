import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

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
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {
  chart: Chart;
  project: any;

  constructor(private router: Router) { 
    this.chart = {
      type: 'Line',
      data: data['Line']
    };
    this.project = {
      image: "assets/img/cau-dat/cau-dat-farm.png",
      weatherIcon: "assets/img/cau-dat/weather.png",
      name: "CAUDATFARM",
      location: "Dalat, Vietnam",
      surface: "225",
      worker: "200",
      zone: 3
    }
  }

  ngOnInit() {
  }

}
