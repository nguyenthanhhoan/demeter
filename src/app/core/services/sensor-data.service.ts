import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

declare var moment: any;

@Injectable()
export class SensorDataService {
  private sensorDataUrl = 'user/sensor_data';

  constructor (private apiService: ApiService) {}

  getByTimestamp(start_timestamp, end_timestamp, fields, zone_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/timestamp/${start_timestamp}/${end_timestamp}?zone_id=${zone_id}`)
      .map((items) => {
        return this.extractChartData(items, fields);
      });
  }

  getByDate(date, fields, zone_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/date/${date}/zone/${zone_id}`)
      .map((items) => {
        return this.extractChartData(items, fields);
      });
  }

  getLatest(fields, zone_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/latest?zone_id=${zone_id}`)
      .map((items) => {
        return this.extractChartData(items, fields);
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
        serie.data.push(parseFloat(item.payload.data[serie.field_id]));
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
