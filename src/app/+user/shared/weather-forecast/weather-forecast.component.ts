import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { WUndergroundService } from '../../../shared/integration/wunderground/wunderground.service';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

declare var $: any;
declare var moment: any;

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
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  chart: Chart;

  weather: any;
  weatherForecasts: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wundergroundService: WUndergroundService) { 
    this.chart = {
      type: 'Line',
      data: data['Line']
    };

  }

  ngOnInit() {
    this.weather = {};

    this.wundergroundService.getCurrentWeatherData(123)
    .subscribe((weather) => {
      this.weather = weather;
      this.weather.icon = `assets/img/cau-dat/weather-icon/${this.weather.icon}.svg`;
      console.log('this.weather', this.weather);
    })

    this.wundergroundService.getWeatherForecastData(123)
    .subscribe((weatherForecasts) => {
      this.weatherForecasts = weatherForecasts;
      console.log('this.weatherForecasts', this.weatherForecasts);
    })
  }
}
