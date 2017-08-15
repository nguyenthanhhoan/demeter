import { URLSearchParams } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { AppSettings } from '../../../../app.settings';

import { ZoneService } from '../../../../core/services/zone.service';
import { SensorDataService } from '../../../../core/services/sensor-data.service';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';

declare var Highcharts: any;
declare var moment: any;

@Component({
  templateUrl: './zone-history.component.html',
  styleUrls: ['./zone-history.component.css']
})
export class ZoneHistoryComponent implements OnInit {

  zone_id: number;
  chartData;
  singleChartDatas: any = [];
  isRequesting = false;
  filter: any = {};
  charts: any[] = [];
  fields: any[];
  private zoneObservable: Observable<any>;
  private zoneSubscription: ISubscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
    private zoneService: ZoneService,
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

  load24hData() {
    this.requestFieldAssignedToZone()
    .flatMap(() => {
      if (this.fields && this.fields.length > 0) {
        return this.sensorDataService.getLatestV2(this.fields, this.zone_id);
      } else {
        return Observable.empty();
      }
    })
    .subscribe((chartData) => {
      this.chartData = chartData;
      this.buildSingleChartData(this.chartData);
      this.isRequesting = false;
    });
  }

  buildSingleChartData(fullChartData) {
    this.singleChartDatas = fullChartData.data.map((singleChartData) => {
      return {
        x: singleChartData.x,
        y: singleChartData.y,
        type: 'scatter',
        name: singleChartData.name
      };
    });
  }

  queryHistoryData() {
    if (!this.filter.date || !this.filter.start_time || !this.filter.end_time) {
      this.notificationService.showErrorMessage({
        title: 'error',
        content: 'No data match your filter.'
      });
      return;
    } else {
      this.isRequesting = true;
      this.loadHistoryData();
    }
  }

  loadHistoryData() {
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

  requestFieldAssignedToZone() {
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

  requestDailyChartData(start_timestamp, end_timestamp) {
    this.sensorDataService.getByTimestampV2(start_timestamp, end_timestamp, this.fields, this.zone_id)
      .subscribe((data) => {
        this.chartData = data;
        this.buildSingleChartData(this.chartData);
        this.isRequesting = false;
      }, () => {
        this.isRequesting = false;
      });
  }
}
