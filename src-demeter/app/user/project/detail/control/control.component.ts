import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AppSettings } from '../../../../app.settings';

@Component({
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  project: any = {};
  isRequesting: boolean;
  isDeviceUpdating: boolean = false;
  package_id: string;
  modes = {
    manual: {
      display: 'Manual'
    },
    timer: {
      display: 'Timer'
    },
    event: {
      display: 'Auto'
    }
  };
  // devices that can control
  devices: any = [];

  // devices that can read value only
  sensors: any = [];
  selectedDevice: any = {};
  @ViewChild('controlTimer') controlTimer;
  private storeSubscription: ISubscription;
  private deviceSubscription: ISubscription;
  constructor(private store: Store<any>,
              private ngZone: NgZone,
              private deviceService: DeviceService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id && this.project.id !== app.project.id) {
        this.project = app.project;
        this.package_id = app.project.package.serial_name;
        this.loadDevice();
      }
    });
    this.deviceSubscription = this.store.select('deviceState')
    .subscribe((state: any) => {
      this.updateDeviceState(state);
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
      this.transformDeviceValue(this.devices);
    });
  }

  transformDeviceValue(devices) {
    devices.forEach((device, index) => {
      device.value = parseInt(device.value, 10) === 1;
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

  updateMode(mode) {
    const currentMode = this.selectedDevice.mode;
    this.selectedDevice.mode = '';
    setTimeout(() => {
      this.selectedDevice.mode = currentMode;
    });
    this.notificationService.confirm(`Do you want to switch to ${this.modes[mode].display} mode?`, 'Confirmation')
    .subscribe(() => {
      this.selectedDevice.mode = mode;
      let device = this.selectedDevice;
      let submitDevice: any = {
        uuid: device.uuid,
        mode: mode
      };
      this.deviceService.put(submitDevice)
      .subscribe(() => {
        this.notificationService.showMessage(`Mode updated to ${mode} successfully!`);
      });
    });
  }

  changeValue($event, device) {
    $event.preventDefault();
    if (this.isDeviceUpdating || !(this.project.connected == 1)) {
      return;
    }
    let newValue = !device.value;
    let intValue = newValue ? 1 : 0;
    this.isDeviceUpdating = true;
    this.deviceService.updateDeviceValue({
      id: device.uuid,
      value: intValue
    })
    .subscribe(() => {
      this.notificationService.showMessage('Command sent successfully!');
      // TODO: Handle timeout
      // device.isDeviceUpdating = false;
    }, () => {
      this.notificationService.showErrorMessage({
        content: 'Cannot send command!'
      });
      this.isDeviceUpdating = false;
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
              this.isDeviceUpdating = false;
            }
          });
        }
      }
    }
  }
}
