import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import { WeatherService } from '../../../../core/services/weather.service';
import { ZoneService } from '../../../../core/services/zone.service';

declare var Highcharts: any;
declare var $: any;

@Component({
  templateUrl: './zone-weather.component.html',
  styleUrls: ['./zone-weather.component.css']
})
export class ZoneWeatherComponent implements OnInit {

  zone: any;
  projectId: number;
  zoneId: number;
  weather: any = {};
  weatherForecasts: any[];
  currentWeatherLoaded: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private zoneService: ZoneService,
              private weatherService: WeatherService) {

  }

  ngOnInit() {
    let needToLoad = true;
    this.store.select('zone')
    .takeWhile(() => {
      return (needToLoad);
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zoneId = zoneModel.zoneId;
        this.projectId = zoneModel.projectId;
        this.zone = zoneModel.zone;
        this.fetchWeatherData();
        needToLoad = false;
      }
    });
  }

  fetchWeatherData() {
    let {project} =  this.zone;
    if (project && project.location_geometry) {
      this.weatherService.getCurrentWeatherFullData(project.location_geometry)
        .subscribe((weather) => {
          if (weather) {
            this.weather = weather;
            this.weather.icon = `assets/img/cau-dat/weather-icon/${this.weather.icon}.svg`;
            this.currentWeatherLoaded = true;
          }
        });

      this.weatherService.getWeatherForecastData(project.location_geometry, 10)
        .subscribe((weatherForecasts) => {
          if (weatherForecasts) {
            this.weatherForecasts = weatherForecasts;
            this.loadHighChart();
          }
        });
    }
  }

  loadHighChart() {
    System.import('script-loader!highcharts').then(() => {
      return System.import('script-loader!highcharts/highcharts.js');
    }).then(() => {
      this.configChart();
      this.fetchHourlyWeatherData();
    });
  }

  fetchHourlyWeatherData() {
    let {project} = this.zone;
    if (project && project.location_geometry) {
      this.weatherService.getHourlyWeatherData(project.location_geometry)
        .subscribe((result) => {
          this.initChart(result);
        });
    }
  }

  initChart(activity) {
    $.each(activity.datasets, function (i, dataset) {

      // Add X values
      dataset.data = Highcharts.map(dataset.data, function (val, j) {
        return [activity.xData[j], val];
      });

      $('<div class="chart">')
        .appendTo('.chart-wrap')
        .highcharts({
          chart: {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20
          },
          title: {
            text: dataset.name,
            align: 'left',
            margin: 0,
            x: 30
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          xAxis: {
            crosshair: true,
            labels: {
              enabled: false
            }
          },
          yAxis: {
            title: {
              text: null
            }
          },
          tooltip: {
            positioner: function () {
              return {
                x: this.chart.chartWidth - this.label.width, // right aligned
                y: -1 // align to title
              };
            },
            borderWidth: 0,
            backgroundColor: 'none',
            pointFormat: '{point.y}',
            headerFormat: '',
            shadow: false,
            style: {
              fontSize: '18px'
            },
            valueDecimals: dataset.valueDecimals
          },
          series: [{
            data: dataset.data,
            name: dataset.name,
            type: dataset.type,
            color: Highcharts.getOptions().colors[i],
            fillOpacity: 0.3,
            tooltip: {
              valueSuffix: ' ' + dataset.unit
            }
          }]
        });
    });
  }

  configChart() {

    $('.chart-wrap').bind('mousemove touchmove touchstart', function (e) {
      let chart,
        point,
        i,
        event;

      for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i];
        event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
        point = chart.series[0].searchPoint(event, true); // Get the hovered point

        if (point) {
          point.highlight(e);
        }
      }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };

    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    Highcharts.Point.prototype.highlight = function (event) {
      this.onMouseOver(); // Show the hover marker
      this.series.chart.tooltip.refresh(this); // Show the tooltip
      this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };
  }

}
