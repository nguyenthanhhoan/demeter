import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  camera: any = {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4'
  };
  isRequesting: boolean = false;
  devices = [];
  private project: any = {};
  private package_id: string;
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
    this.storeSubscription.unsubscribe();
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
    });
  }
}
