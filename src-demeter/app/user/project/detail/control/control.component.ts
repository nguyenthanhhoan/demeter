import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  project: any = {};
  isRequesting: boolean;
  isDeviceUpdating: boolean = false;
  package_id: string;

  // devices that can control
  devices: any = [];

  // devices that can read value only
  sensors: any = [];
  selectedDevice: any = {};
  @ViewChild('controlTimer') controlTimer;
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private deviceService: DeviceService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
        this.package_id = app.project.package.hash_id;
        this.loadDevice();
      }
    });
  }

  ngOnDestroy() {
  }

  loadDevice() {
    this.isRequesting = true;
    let params: URLSearchParams = new URLSearchParams();
    params.set('package_id', this.package_id);
    this.deviceService.getListAssigned({
      search: params
    }).subscribe((devices) => {
      this.devices = devices.filter((device) => {
        return device.field_attribute === 'read_write';
      });
      this.sensors = devices.filter((device) => {
        return device.field_attribute !== 'read_write';
      });
      this.selectedDevice = this.devices[0];
      this.isRequesting = false;
    });
  }

  updateDevice() {
    this.isRequesting = true;
    let device = this.selectedDevice;
    let submitDevice: any = {
      uuid: device.uuid,
      name: device.name,
      mode: device.mode
    };
    if (device.mode === 'timer') {
      submitDevice.timer_start_date = device.timer_start_date;
      submitDevice.timer_end_date = device.timer_end_date;
      submitDevice.timer_daily_schedule = JSON.stringify(device.timer_daily_schedule);
    }
    if (device.mode === 'event') {
      submitDevice.events = JSON.stringify(device.events);
    }
    this.deviceService.put(submitDevice)
    .subscribe(() => {
      this.isRequesting = false;
      this.notificationService.showMessage('Update to device successfully!');
    }, () => {
      this.isRequesting = false;
    });
  }

  changeValue($event, device) {
    $event.preventDefault();
    let newValue = !device.value;
    let intValue = newValue ? 1 : 0;
    this.isDeviceUpdating = true;
    // this.deviceService.updateDeviceValue({
    //   id: device.uuid,
    //   value: intValue
    // })
    // .subscribe(() => {
    //   this.notificationService.showMessage('Command sent successfully!');
    //   this.isDeviceUpdating = false;
    // }, () => {
    //   this.notificationService.showErrorMessage({
    //     content: 'Cannot send command!'
    //   });
    //   this.isDeviceUpdating = false;
    // });
  }
}
