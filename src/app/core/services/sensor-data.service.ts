import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../app.settings';
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

  getByTimestampV2(start_timestamp, end_timestamp, fields, zone_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/timestamp/${start_timestamp}/${end_timestamp}?zone_id=${zone_id}`)
      .map((items) => {
        return this.extractChartDataPlotly(items, fields);
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

  /**
   * Get data for Plotly chart library
   */
  getLatestV2(fields, zone_id): Observable<any> {
    return this.apiService
      .fetch(
        `${this.sensorDataUrl}/latest?zone_id=${zone_id}`)
      .map((items) => {
        return this.extractChartDataPlotly(items, fields);
      });
  }

  buildTraces(items: any, fields: any[]) {
    // traces help to build legend toggle on the right
    let xAxis_cates = [];
    let traces = [];
    let timestamps = [];
    fields.forEach((field, index) => {
      let trace = {
        x: [],
        y: [],
        field_id: field.field_id,
        name: field.name_display,
        type: 'scatter'
      };
      if (index > 0) {

        // Mapping with the correct yaxis
        trace['yaxis'] = 'y' + (index + 1);
      }
      traces.push(trace);
    });
    items.forEach(item => {
      let timestamp = parseInt(item.timestamp, 10);
      let formated_time = moment(timestamp).format(AppSettings.date_time_format.date_time_iso);
      xAxis_cates.push(formated_time);
      traces.forEach((trace) => {
        trace.y.push(parseFloat(item.payload.data[trace.field_id]));
      });
    });
    traces.forEach((trace) => {
      trace.x = xAxis_cates;
    });
    return traces;
  }

  buildLayoutForMultipeYAxis(items: any, fields: any[]) {
    let colors = [
      'rgb(31, 119, 180)',
      'rgb(255, 127, 14)',
      'rgb(44, 160, 44)',
      'rgb(214, 39, 40)',
      'rgb(148, 103, 189)',
      'rgb(140, 86, 75)'
    ];
    let chartLeftSides = Math.ceil(fields.length / 2);
    let chartRightSides = Math.floor(fields.length / 2);

    let layout = {
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      title: '',

      // Sets the domain of this axis (in plot fraction).
      // Each object has one or more of the keys listed below.
      xaxis: {
        domain: [chartLeftSides * 0.1, 1 - chartRightSides * 0.1],
      }
    };

    fields.forEach((field, index) => {
      let propName = 'yaxis';
      if (index > 0) {
        propName += (index + 1);
      }
      let propVal: any = {
        title: field.name_display,
        titlefont: {color: colors[index]},
        tickfont: {color: colors[index]}
      };
      if (index > 0) {
        let position = index % 2 === 0 ? 'left' : 'right';
        propVal.anchor = 'free';
        propVal.overlaying = 'y';
        propVal.side = position;

        // Cannot find docs for position attr, guess it help arrange
        // y axis
        // propVal.position = index % 2 === 0 ? 0.05 * index : 1 - 0.05 * index;
        if (position === 'left') {
          propVal.position = 0.1 * chartLeftSides;
          chartLeftSides--;
        } else {
          propVal.position = 1 - 0.1 * chartRightSides;
          chartRightSides--;
        }
        // console.log('index', index, propVal.position, field.name_display);
      } else {
        chartLeftSides--;
      }
      layout[propName] = propVal;
    });
    return layout;
  }

  extractChartDataPlotly(items: any, fields: any[]) {
    return {
      data: this.buildTraces(items, fields),
      layout: this.buildLayoutForMultipeYAxis(items, fields)
    };
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
