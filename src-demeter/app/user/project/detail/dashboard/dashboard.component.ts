import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';
import { AppSettings } from '../../../../app.settings';
import { NotificationService } from '../../../../core/services/notification.service';

declare var moment: any;
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isRequesting: boolean = false;
  devices = [];
  cameras = [];
  private project: any = {};
  private package_id: string;
  private storeSubscription: ISubscription;
  private deviceSubscription: ISubscription;

  constructor(private store: Store<any>,
              private ngZone: NgZone,
              private deviceService: DeviceService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id && this.project.id !== app.project.id) {
        this.project = app.project;
        this.package_id = app.project.package.serial_name;
        this.filterMainCameras();
        this.loadDevice();
      }
    });
    this.deviceSubscription = this.store.select('deviceState')
    .subscribe((state: any) => {
      this.updateDeviceState(state);
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.deviceSubscription.unsubscribe();
  }

  filterMainCameras() {
    const { cameras } = this.project;
    this.cameras = cameras.filter((camera) => {
      return camera.main;
    });
  }

  loadDevice() {
    this.isRequesting = true;
    let params: URLSearchParams = new URLSearchParams();
    params.set('package_id', this.package_id);
    params.set('field_attribute', 'read_write');
    this.deviceService.getListAssigned({
      search: params
    }).subscribe((devices) => {
      this.devices = devices;
      this.isRequesting = false;
      this.transformDeviceValue(this.devices);
    }, () => this.isRequesting = false );
  }

  transformDeviceValue(devices) {
    devices.forEach((device, index) => {
      device.value = parseInt(device.value, 10) === 1;
      device.isRunning = false;
    });
  }

  updateDeviceValue(receivedData) {
    let newValue = parseInt(receivedData.value, 10) === 1;
    let timeFormatted = moment(receivedData.timestamp * 1000)
      .format(AppSettings.date_time_format.date_time);

    this.devices.forEach((device, index) => {
      if (this.package_id === receivedData.gateway && device.field_id === receivedData.field
        && device.value !== newValue) {

        console.log(`Received updated value device=${device.field_id}, value=${newValue}`);
        device.value = newValue;
        device.isRunning = false;
      }
    });
  }

  changeValue($event, device) {
    if (device.mode !== 'manual' || device.isRunning) {
      return;
    }
    $event.preventDefault();
    let newValue = !device.value;
    let intValue = newValue ? 1 : 0;
    device.isRunning = true;
    this.deviceService.updateDeviceValue({
      id: device.uuid,
      value: intValue
    })
    .subscribe(() => {
      this.notificationService.showMessage('Command sent successfully!');
      // TODO: Handle timeout
      // device.isRunning = false;
    }, () => {
      this.notificationService.showErrorMessage({
        content: 'Cannot send command!'
      });
      device.isRunning = false;
    });
  }

  private updateDeviceState(state) {
    if (state && state.packages && state.packages.length > 0) {
      for (const singlePackage of state.packages) {
        if (singlePackage && singlePackage.reported &&
          singlePackage.thingName === this.package_id) {

          const { reported } = singlePackage;
          this.devices.forEach((device, index) => {
            if (device.field_id && reported[device.field_id] &&
              device.value != reported[device.field_id].value) {

              let newValue = reported[device.field_id].value;
              let intValue = newValue == 1 ? 1 : 0;
              device.value = intValue;
              device.isRunning = false;
            }
          });
        }
      }
    }
  }
}
