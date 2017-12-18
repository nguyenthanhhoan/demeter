import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { JsonApiService } from '../json-api.service';

declare var moment: any;

@Injectable()
export class SensorDataService {
  private sensorDataUrl = 'family/sensor_data';

  constructor(private apiService: ApiService,
              private jsonApiService: JsonApiService ) {}

  getByTimestamp(start_timestamp, end_timestamp, fields, package_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/timestamp/${start_timestamp}/${end_timestamp}?package_id=${package_id}`)
      .map((items) => {
        return this.extractChartData(items, fields);
      });
  }

  getByTimestampV2(start_timestamp, end_timestamp, package_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/timestamp/${start_timestamp}/${end_timestamp}?package_id=${package_id}`)
      .map((items) => {
        return items;
      });
  }

  getByDate(date, fields, package_id): Observable<any> {
    return this.apiService
    // return this.jsonApiService
      .fetch(
        `${this.sensorDataUrl}/date/${date}/zone/${package_id}`)
      .map((items) => {
        return this.extractChartData(items, fields);
      });
  }

  getLatest(fields, package_id): Observable<any> {
    return this.apiService
    // return this.jsonApiService
      .fetch(
        `${this.sensorDataUrl}/latest?package_id=${package_id}`)
      .map((items) => {
        return this.extractChartData(items, fields);
      });
  }

  /**
   * Get data for Plotly chart library
   */
  getLatestV2(package_id): Observable<any> {
    return this.apiService
    // return this.jsonApiService
      .fetch(
        `${this.sensorDataUrl}/latest?package_id=${package_id}`)
      .map((items) => {
        return items;
      });
  }

  extractChartData(items: any, fields: any[]) {
    let xAxis_cates = [];
    let series = [];
    let timestamps = [];

    // TODO: These field should get from device_field
    // Together with: chart_name in summary page (sensor-data-chart.component.ts)
    fields.forEach((field) => {
      series.push({
        field_id: field.field_id,
        name: field.name_display,
        valueSuffix: ` ${field.chart_value_suffix}`,
        diff: field.chart_value_diff,
        data: []
      });
    });
    items.forEach(item => {
      let timestamp = parseInt(item.timestamp, 10);
      let formated_time = moment(timestamp).format('HH:mm:ss A');
      xAxis_cates.push(formated_time);
      timestamps.push(timestamp);
      series.forEach((serie) => {
        if (item && item.payload &&
          item.payload.data &&
          typeof item.payload.data[serie.field_id] !== 'undefined') {
          serie.data.push(parseFloat(item.payload.data[serie.field_id]));
        } else {
          serie.data.push(null);
        }
      });
    });
    return {
      xAxis: {
        categories: xAxis_cates
      },
      timestamps: timestamps,
      series: series
    };
  }
}
