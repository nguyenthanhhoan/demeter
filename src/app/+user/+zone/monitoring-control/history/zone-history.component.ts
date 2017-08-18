import { URLSearchParams } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { AppSettings } from '../../../../app.settings';

import { SensorDataService } from '../../../../core/services/sensor-data.service';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';

declare var moment: any;

@Component({
  templateUrl: './zone-history.component.html',
  styleUrls: ['./zone-history.component.scss']
})
export class ZoneHistoryComponent implements OnInit {

  zone_id: number;

  multipleChartData;
  singleChartDatas: any = [];
  isRequesting = false;

  // date/time filter
  filter: any = {};

  // hold list of fields
  private fields: any[];
  // Chart response hold the data return from service
  private dataResponse;
  private zoneObservable: Observable<any>;
  private zoneSubscription: ISubscription;

  constructor(private store: Store<any>,
    private sensorDataService: SensorDataService,
    private deviceFieldService: DeviceFieldService,
    private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        let { zone } = zoneModel;
        this.zone_id = zone.id;
        this.load24hData();
      }
    });
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
  }

  private load24hData() {
    this.requestFieldAssignedToZone()
    .flatMap(() => {
      if (this.fields && this.fields.length > 0) {
        return this.sensorDataService.getLatestV2(this.zone_id);
      } else {
        return Observable.empty();
      }
    })
    .subscribe((dataResponse) => {
      this.dataResponse = dataResponse;
      this.buildChartData();
      this.isRequesting = false;
    });
  }

  private buildSingleChartData(fullChartData) {
    this.singleChartDatas = fullChartData.data.map((singleChartData) => {
      return {
        x: singleChartData.x,
        y: singleChartData.y,
        type: 'scatter',
        name: singleChartData.name
      };
    });
  }

  private queryHistoryData() {
    if (!this.filter.date || !this.filter.start_time || !this.filter.end_time) {
      this.notificationService.showErrorMessage({
        title: 'error',
        content: 'No data match your filter.'
      });
      return;
    } else {
      this.loadHistoryData();
    }
  }

  private loadHistoryData() {
    this.isRequesting = true;
    this.multipleChartData = {};
    this.singleChartDatas = [];
    let filter = this.filter;
    let start_timestamp =
      moment(`${filter.date} ${filter.start_time}`,
              AppSettings.date_time_format.date_time).valueOf();

    let end_timestamp =
      moment(`${filter.date} ${filter.end_time}`,
              AppSettings.date_time_format.date_time).valueOf();

    if (this.fields && this.fields.length > 0) {
      this.requestDailyChartData(start_timestamp, end_timestamp);
    }
  }

  private requestFieldAssignedToZone() {
    // Firstly, request list of device assigned to zone
    this.isRequesting = true;
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zone_id.toString());
    params.set('link_type', 'data');
    return this.deviceFieldService.getListAssigned({
      search: params
    }).map((fields) => {
      this.fields = fields;
      if (fields.length === 0) {
        this.isRequesting = false;
        this.notificationService.showErrorMessage({
          title: 'error',
          content: 'No field was assigned to this zone.'
        });
      }
    });
  }

  private buildChartData() {
    let { dataResponse } = this;
    this.multipleChartData = {
      data: this.buildTraces(dataResponse, this.fields),
      layout: this.buildLayoutForMultipeYAxis(dataResponse, this.fields)
    };
    this.buildSingleChartData(this.multipleChartData);
  }

  private requestDailyChartData(start_timestamp, end_timestamp) {
    this.sensorDataService.getByTimestampV2(start_timestamp, end_timestamp, this.zone_id)
      .subscribe((dataResponse) => {
        this.dataResponse = dataResponse;
        this.buildChartData();
        this.isRequesting = false;
      }, () => {
        this.isRequesting = false;
      });
  }


  private buildTraces(items: any, fields: any[]) {
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

  private buildLayoutForMultipeYAxis(items: any, fields: any[]) {
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
      title: 'Summary',

      // Sets the domain of this axis (in plot fraction).
      // Each object has one or more of the keys listed below.
      xaxis: {
        domain: [chartLeftSides * 0.05, 1 - chartRightSides * 0.05],
      },
      margin: {
        l: 0,
        r: 0
      },
      // TODO: Not understand those magic fields
      legend: {
        x: 0.5,
        xanchor: 'center',

        // number between or equal to -2 and 3
        // default is 1
        y: -0.2,
        yanchor: 'bottom',
        orientation: 'h'
      }
    };

    fields.forEach((field, index) => {
      let propName = 'yaxis';
      if (index > 0) {
        propName += (index + 1);
      }
      let propVal: any = {
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
          propVal.position = 0.05 * chartLeftSides;
          chartLeftSides--;
        } else {
          propVal.position = 1 - 0.05 * chartRightSides;
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

}
