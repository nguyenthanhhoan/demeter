import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { ProjectService } from '../../../core/services/project.service';
import { WUndergroundService } from '../../../shared/integration/wunderground/wunderground.service';

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
  
  @Input()
  project: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private wundergroundService: WUndergroundService) { 
    this.chart = {
      type: 'Line',
      data: data['Line']
    };
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    if (id) {
      this.project = {};
      this.projectService.getOne(id).subscribe(data => {
        Object.assign(this.project, data);
        this.requestWeatherData();
      });
    } else {
      this.requestWeatherData();
    }
  }

  requestWeatherData() {
    let location_geometry = this.project.location_geometry;
    if (location_geometry) {
      this.wundergroundService.getWeatherForecastData(location_geometry).subscribe(weatherForecastDatas => {
        Object.assign(this.project, {
          weatherIcon: `assets/img/cau-dat/weather-icon/${weatherForecastDatas[0].icon}.svg`
        });
      });
    } else {
      console.log(`Location is not correct ${this.project}`);
    }
  }
}
