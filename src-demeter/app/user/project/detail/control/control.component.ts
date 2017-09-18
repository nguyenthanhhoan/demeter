import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';

@Component({
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  project: any = {};
  isRequesting: boolean;
  package_id: string;
  devices: any = [];
  selectedDevice: any = {};
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private deviceService: DeviceService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
        // TODO:
        this.package_id = 'B5NQNMEx8q';
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
    params.set('field_attribute', 'read_write');
    this.deviceService.getListAssigned({
      search: params
    }).subscribe((devices) => {
      this.devices = devices;
      this.selectedDevice = this.devices[0];
      this.isRequesting = false;
    });
  }
}
