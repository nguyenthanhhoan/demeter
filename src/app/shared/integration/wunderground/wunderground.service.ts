import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { NotificationService } from '../../utils/notification.service';

declare var moment: any;

@Injectable()
export class WUndergroundService {

  constructor (
    private apiService: ApiService,
    private jsonApiService: JsonApiService,
    private notificationService: NotificationService) {}

  isMock = false;

  getWeatherForecastData(location): Observable<any> {
    if (this.isMock) {
      let url = `/integration/wunderground-forecast.json`;
      return this.jsonApiService.fetch(url).map(this.extractWeatherForecastData);
    } else {
      let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/forecast10day/q/${location}.json`;
      return this.apiService.fetchExternal(url)
        .map((res) => {
          return this.extractWeatherForecastData(res)
        });
    }
  }

  getCurrentWeatherData(location): Observable<any> {
    if (this.isMock) {
      let url = `/integration/wunderground-current.json`;
      return this.jsonApiService.fetch(url).map(this.extractCurrentWeatherData);
    } else {
      let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/conditions/q/${location}.json`;
      return this.apiService.fetchExternal(url)
        .map((res) => {
          return this.extractCurrentWeatherData(res)
        });
    }
  }

  extractWeatherForecastData(res: any) {
    if (res.forecast) {
      var forecastDateResults = [];
      let days = res.forecast.simpleforecast.forecastday;
      for (var index = 0; index < 7; index++) {
        let day = days[index];
        let dayMoment = moment(parseInt(day.date.epoch) * 1000);
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
    } else if (res.response.error) {
      this.notificationService.showErrorMessage({
        title: 'WUnderground ' + res.response.error.type,
        content: res.response.error.description
      })
    } else {
      console.log('Go to unhandled case with ', res);
    }
  }

  extractCurrentWeatherData(res: any) {
    if (res.current_observation) {
      var currentData = {
        temp: res.current_observation.temp_c,
        icon: res.current_observation.icon,
        weather: res.current_observation.weather,
        relative_humidity: res.current_observation.relative_humidity,
        precip_today_in: res.current_observation.precip_today_in,
        wind_mph: res.current_observation.wind_mph,
      }
      return currentData;
    } else if (res.response.error) {
      this.notificationService.showErrorMessage({
        title: 'WUnderground ' + res.response.error.type,
        content: res.response.error.description
      })
    } else {
      console.log('Go to unhandled case with ', res);
    }
  }
}
