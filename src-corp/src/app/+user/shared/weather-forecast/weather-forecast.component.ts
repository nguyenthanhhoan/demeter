import {
  ApplicationRef, Component, OnInit, OnChanges, DoCheck, Input, ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { WeatherService } from '../../../core/services/weather.service';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit, DoCheck {
  chart: Chart;

  @Input()
  project: any;

  oldProject: any;

  weather: any;
  weatherForecasts: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weather = {};
    this.oldProject = {};
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    if (this.project && this.project.location_geometry) {
      this.weatherService.getCurrentWeatherData(this.project.location_geometry)
      .subscribe((weather) => {
        if (weather) {
          this.weather = weather;
          this.weather.icon = `assets/img/cau-dat/weather-icon/${this.weather.icon}.svg`;
        }
      });

      this.weatherService.getWeatherForecastData(this.project.location_geometry, 7)
      .subscribe((weatherForecasts) => {
        if (weatherForecasts) {
          this.weatherForecasts = weatherForecasts;
        }
      });
    }
  }

  ngDoCheck() {
    if (this.project && this.project.id && this.oldProject.id !== this.project.id) {
      this.fetchWeatherData();
      this.oldProject = this.project;
    }
  }
}
