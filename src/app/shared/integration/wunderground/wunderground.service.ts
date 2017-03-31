import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';
import { JsonApiService } from '../../../core/api/json-api.service';

declare var moment: any;

@Injectable()
export class WUndergroundService {

  constructor (
    private apiService: ApiService,
    private jsonApiService: JsonApiService) {}

  getWeatherForecastData(location): Observable<any> {
    // let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/forecast/q/11.8847245,108.5612228.json`;
    let url = `/integration/wunderground.json`;
    // let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/forecast/q/${location}.json`;

    return this.jsonApiService.fetch(url).map(this.extractWeatherForecastData);

    // return this.apiService.fetchExternal(url)
    //         .map(this.extractWeatherForecastData);
  }

  getWeatherIcon(location): Observable<any> {
    
    let url = `/integration/wunderground.json`;
    return this.jsonApiService.fetch(url).map(this.extractWeatherIcon);

    // let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/forecast/q/${location}.json`;
    // return this.apiService.fetchExternal(url)
    //         .map(this.extractWeatherIcon);
  }

  extractWeatherIcon(res: any) {
    let icon = res.forecast.simpleforecast.forecastday[0].icon;
    return icon;
  }

  extractWeatherForecastData(res: any) {

    var forecastDateResults = [];

    let days = res.forecast.simpleforecast.forecastday;
    for (var index = 0; index < 7; index++) {
      let day = days[index];
      let dayMoment = moment(day.date.epoch * 1000);
      var forecastDateResult: any = {};
      forecastDateResult.date = dayMoment;
      forecastDateResult.dayFormatted = dayMoment.format('ddd');
      forecastDateResult.dateFormatted = dayMoment.format('DD/MM');
      forecastDateResult.icon = day.icon;
      forecastDateResult.conditions = day.conditions;
      forecastDateResult.celsiusHigh = day.high.celsius;
      forecastDateResult.celsiusLow = day.low.celsius;
      forecastDateResult.avehumidity = day.avehumidity;
      forecastDateResult.avewind = day.avewind.kph;
      forecastDateResults.push(forecastDateResult);
    }
    return forecastDateResults;
  }
}
