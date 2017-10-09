import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';
import { SensorDataService } from '../../../../core/api/services/sensor-data.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AppSettings } from '../../../../app.settings';
import { loadHighChart, buildHighChartModel } from '../../../../app.utils';

declare var moment: any;
declare var Highcharts: any;
declare var $: any;
@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  isRequesting: boolean = false;
  devices = [];
  // date/time filter
  filter: any = {
    date: moment().format(AppSettings.date_time_format.date_iso),
    start_time: '00:00',
    end_time: '23:59'
  };
  chartTabs: any[] = [];
  activeChartTab = this.chartTabs[0];
  private dataResponse;
  private project: any = {};
  private package_id: string;
  private storeSubscription: ISubscription;


  constructor(private store: Store<any>,
              private deviceService: DeviceService,
              private notificationService: NotificationService,
              private sensorDataService: SensorDataService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
        this.package_id = app.project.package.serial_name;
        this.load24hData();
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  setActiveChartTab(chartTab) {
    this.activeChartTab = chartTab;
    this.switchTab();
  }

  switchTab() {
    this.loadChart(this.activeChartTab);
  }

  private report() {
    if (!this.filter.date || !this.filter.start_time || !this.filter.end_time) {
      this.notificationService.showErrorMessage('No data match your filter.');
      return;
    } else {
      this.loadHistoryData();
    }
  }

  private load24hData() {
    this.requestFieldAssignedToZone()
    .flatMap(() => {
      if (this.devices && this.devices.length > 0) {
        return this.sensorDataService.getLatest(this.devices, this.package_id);
      } else {
        return Observable.empty();
      }
    })
    .subscribe((dataResponse) => {
      this.buildChartData(dataResponse);
      this.isRequesting = false;
    });
  }

  private loadHistoryData() {
    this.isRequesting = true;
    let filter = this.filter;

    // TODO: Find a better way to dealing with timezone. To GMT
    let start_timestamp =
      moment(`${filter.date} ${filter.start_time}`,
              AppSettings.date_time_format.date_time_iso).valueOf();

    // TODO: Find a better way to dealing with timezone. To GMT
    let end_timestamp =
      moment(`${filter.date} ${filter.end_time}`,
              AppSettings.date_time_format.date_time_iso).valueOf();

    if (this.devices && this.devices.length > 0) {
      this.requestDailyChartData(start_timestamp, end_timestamp);
    }
  }

  private requestFieldAssignedToZone() {
    // Firstly, request list of device assigned to zone
    this.isRequesting = true;
    let params: URLSearchParams = new URLSearchParams();
    params.set('package_id', this.package_id);
    params.set('field_attribute', 'read_only');
    return this.deviceService.getListAssigned({
      search: params
    }).map((devices) => {
      this.devices = devices;
      if (devices.length === 0) {
        this.isRequesting = false;
        this.notificationService.showErrorMessage({
          title: 'error',
          content: 'No device found!'
        });
      }
    });
  }

  private buildChartData(data) {
    this.isRequesting = false;
    this.chartTabs = [];
    console.log('Number of points returned ', data.xAxis.categories.length);

    if (data.xAxis.categories.length === 0) {
      this.notificationService.showErrorMessage({
        title: 'error',
        content: 'No data match your filter.'
      });
    } else {
      // Init chart data with data in the first time request
      this.devices.forEach((field, index) => {
        let chartTab: any = {};
        chartTab.chart_series = data.series[index];
        let length = data.series[index].data.length;
        chartTab.timestamps = data.timestamps;
        chartTab.name = field.name + `(${field.chart_value_suffix})`;
        this.chartTabs.push(chartTab);
      });
      this.activeChartTab = this.chartTabs[0];
      loadHighChart().subscribe(() => {
        this.loadChart(this.activeChartTab);
      });
    }
  }

  private loadChart(chartData) {
    let index = this.chartTabs.indexOf(chartData);
    let chartOpts = buildHighChartModel(chartData);
    setTimeout(() => {
      if (chartData.chart_ref) {
        chartData.chart_ref.update(chartOpts);
      } else {
        // Check chart-container present first, maybe the page has been navigated out
        if ($('#chart-container-' + index).length > 0) {
          chartData.chart_ref = Highcharts.chart('chart-container-' + index, chartOpts);
        } else {
          console.log('Chart container not present!');
        }
      }
    });
  }

  private requestDailyChartData(start_timestamp, end_timestamp) {
    this.sensorDataService.getByTimestamp(start_timestamp, end_timestamp, this.devices, this.package_id)
      .subscribe((dataResponse) => {
        this.buildChartData(dataResponse);
        this.isRequesting = false;
      }, () => {
        this.isRequesting = false;
      });
  }
}
