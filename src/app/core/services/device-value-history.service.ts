import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class DeviceValueHistoryService {
  private sensorDataUrl = 'user/device_value';

  constructor (private apiService: ApiService) {}

  getLatest(gateway, field_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/lastest/gateway/${gateway}/field_id/${field_id}`)
      .map((items) => {
        return this.extractChartData(items);
      });
  }

  extractChartData(items) {
    let chartData = {
      xLabels: [],
      yLabels: ['ON', 'OFF'],
      datasets: [{
          steppedLine: true,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: []
      }],
    };
    items.forEach((item) => {
      chartData.xLabels.push(item.created_at);

      // TODO: Need to check value data type before parsing.
      if (parseInt(item.value) === 1) {
        chartData.datasets[0].data.push('ON');
      } else {
        chartData.datasets[0].data.push('OFF');
      }
    });
    return chartData;
  }
}
