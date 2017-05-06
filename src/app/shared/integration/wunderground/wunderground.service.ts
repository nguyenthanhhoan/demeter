import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { NotificationService } from '../../utils/notification.service';

declare var moment: any;

@Injectable()
export class WUndergroundService {

  isMock = true;
  constructor (
    private apiService: ApiService,
    private jsonApiService: JsonApiService,
    private notificationService: NotificationService) {}

  getWeatherForecastData(location, numOfDay): Observable<any> {
    if (this.isMock) {
      let url = `/integration/wunderground-forecast.json`;
      return this.jsonApiService.fetch(url).map((res) => {
        return this.extractWeatherForecastData(res, numOfDay);
      });
    } else {
      let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/forecast10day/q/${location}.json`;
      return this.apiService.fetchExternal(url)
        .map((res) => {
          return this.extractWeatherForecastData(res, numOfDay);
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
          return this.extractCurrentWeatherData(res);
        });
    }
  }

  getCurrentWeatherFullData(location): Observable<any> {
    if (this.isMock) {
      let url = `/integration/wunderground-current.json`;
      return this.jsonApiService.fetch(url).map(this.extractCurrentWeatherFullData);
    } else {
      let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/conditions/q/${location}.json`;
      return this.apiService.fetchExternal(url)
        .map((res) => {
          return this.extractCurrentWeatherFullData(res);
        });
    }
  }

  getHourlyWeatherData(location): Observable<any> {
    if (this.isMock) {
      let url = `/integration/wunderground-hourly10day.json`;
      return this.jsonApiService.fetch(url).map(this.extractHourlyWeatherData);
    } else {
      let url = `http://api.wunderground.com/api/00d0f6e2f45ef13d/hourly10day/q/${location}.json`;
      return this.apiService.fetchExternal(url)
        .map((res) => {
          return this.extractHourlyWeatherData(res);
        });
    }
  }

  extractWeatherForecastData(res: any, numOfDay) {
    if (res.forecast) {
      let forecastDateResults = [];
      let days = res.forecast.simpleforecast.forecastday;
      for (let index = 0; index < numOfDay; index++) {
        let day = days[index];
        let dayMoment = moment(parseInt(day.date.epoch, 10) * 1000);
        let forecastDateResult: any = {};
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
      });
    } else {
      console.log('Go to unhandled case with ', res);
    }
  }

  extractCurrentWeatherData(res: any) {
    if (res.current_observation) {
      let currentData = {
        temp: res.current_observation.temp_c,
        icon: res.current_observation.icon,
        weather: res.current_observation.weather,
        relative_humidity: res.current_observation.relative_humidity,
        precip_today_in: res.current_observation.precip_today_in,
        wind_mph: res.current_observation.wind_mph
      };
      return currentData;
    } else if (res.response.error) {
      this.notificationService.showErrorMessage({
        title: 'WUnderground ' + res.response.error.type,
        content: res.response.error.description
      });
    } else {
      console.log('Go to unhandled case with ', res);
    }
  }

  extractCurrentWeatherFullData(res: any) {
    if (res.current_observation) {
      let currentData = {
        display_location: res.current_observation.display_location.full,
        elevation: res.current_observation.display_location.elevation,
        latitude: res.current_observation.display_location.latitude,
        longitude: res.current_observation.display_location.longitude,
        observationFromNow: moment(res.current_observation.observation_epoch * 1000).fromNow(),
        temp: res.current_observation.temp_c,
        feelslike: res.current_observation.feelslike_c,
        icon: res.current_observation.icon,
        weather: res.current_observation.weather,
        pressure_mb: res.current_observation.pressure_mb,
        visibility_km: res.current_observation.visibility_km,
        heat_index_c: res.current_observation.heat_index_c,
        dewpoint_c: res.current_observation.dewpoint_c,
        relative_humidity: res.current_observation.relative_humidity,
        precip_today_in: res.current_observation.precip_today_in,
        wind_mph: res.current_observation.wind_mph,
      };
      return currentData;
    } else if (res.response.error) {
      this.notificationService.showErrorMessage({
        title: 'WUnderground ' + res.response.error.type,
        content: res.response.error.description
      });
    } else {
      console.log('Go to unhandled case with ', res);
    }
  }

  extractHourlyWeatherData(res: any) {
    if (res.hourly_forecast) {
      let result = {
        'xData': [],
        'datasets': [{
          'name': 'Temperature (°C)',
          'data': [],
          'unit': '°C',
          'type': 'line',
          'valueDecimals': 1
        }, {
          'name': 'Pressure (hPa)',
          'data': [],
          'unit': 'hPa',
          'type': 'line',
          'valueDecimals': 1
        }, {
          'name': 'Wind Speed',
          'data': [],
          'unit': 'km/h',
          'type': 'line',
          'valueDecimals': 1
        }]
      };
      res.hourly_forecast.forEach((hourlyData) => {
        result.xData.push(hourlyData.FCTTIME.epoch);
        result.datasets[0].data.push(parseInt(hourlyData.temp.metric, 10));
        result.datasets[1].data.push(parseInt(hourlyData.mslp.metric, 10));
        result.datasets[2].data.push(parseInt(hourlyData.wspd.metric, 10));
      });
      return result;
    } else if (res.response.error) {
      this.notificationService.showErrorMessage({
        title: 'WUnderground ' + res.response.error.type,
        content: res.response.error.description
      });
    } else {
      console.log('Go to unhandled case with ', res);
    }
  }
}
