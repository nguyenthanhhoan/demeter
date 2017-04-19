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

  getByTimestamp(start_timestamp, end_timestamp): Observable<any> {
    return this.apiService
      .fetch(`${this.sensorDataUrl}/timestamp/${start_timestamp}/${end_timestamp}`)
      .map(this.extractChartData);
  }

  extractChartData(items: any) {
    let xAxis_cates = [];
    let series = [];
    let fieldConfig = {
      field1: 'Temperature',
      field2: 'Humidity',
      field3: 'Light',
      // field4: 'EC',
      // field5: 'pH',
    };
    series = [{
      name: fieldConfig.field1,
      valueSuffix: ' °C',
      data: []
    }, {
      name: fieldConfig.field2,
      valueSuffix: ' %',
      data: []
    }];
    items.forEach(item => {
      let formated_time = moment(parseInt(item.timestamp, 10)).format('HH:mm:ss A');
      xAxis_cates.push(formated_time);
      series[0].data.push(parseFloat(item.payload.data.field1));
      series[1].data.push(parseFloat(item.payload.data.field2));
    });
    return {
      xAxis: {
        categories: xAxis_cates
      },
      series: series
    };
  }
}
