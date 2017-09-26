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

  // devices that can control
  devices: any = [];

  // devices that can read value only
  sensors: any = [];
  selectedDevice: any = {};
  @ViewChild('controlTimer') controlTimer;
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private ngZone: NgZone,
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
      this.transformDeviceValue(this.devices);
      this.subscribeWebSocket();
    });
  }

  transformDeviceValue(devices) {
    devices.forEach((device, index) => {
      device.value = parseInt(device.value, 10) === 1;
    });
  }

  subscribeWebSocket() {
    let ws = new WebSocket(AppSettings.websocketPath);

    // Client Id for debugging purpose
    let clientId = (new Date()).getTime();
    window['socketClientId'] = clientId;

    let subscribeDevices = this.devices.map((device) => {
      return {
        gateway: this.package_id,
        fieldId: device.field_id
      };
    });

    ws.onopen = () => {
      ws.send(JSON.stringify({
        topic: 'REGISTER', clientId: clientId,
        devices: subscribeDevices
      }));
    };

    ws.onmessage = (event) => {
      let receivedData = JSON.parse(event.data);
      this.ngZone.run(() => {
        this.updateDeviceValue(receivedData);
      });
    };
  }

  updateDeviceValue(receivedData) {
    let newValue = parseInt(receivedData.value, 10) === 1;
    this.devices.forEach((device, index) => {
      if (this.package_id === receivedData.gateway && device.field_id === receivedData.field
        && device.value !== newValue) {

        console.log(`Received updated value device=${device.field_id}, value=${newValue}`);
        device.value = newValue;
        this.isDeviceUpdating = false;
      }
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
    this.notificationService.confirm('Do you want to switch to `mode` mode?', 'Confirmation')
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
      device.isDeviceUpdating = false;
    });
  }
}
