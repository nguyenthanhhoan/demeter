import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { URLSearchParams } from '@angular/http';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';

@Component({
  selector: 'device-add-modal',
  templateUrl: './device-add-modal.component.html'
})
export class DeviceAddModalComponent implements OnInit, OnDestroy {

  @Output() onResolve = new EventEmitter();

  isRequesting = false;

  devices = [];
  selectedDevice: any;

  @ViewChild('modal') public modal: ModalDirective;
  private storeSubscription: ISubscription;
  private deviceGateway: string;
  private zoneId: number;

  constructor(private store: Store<any>,
              private deviceFieldService: DeviceFieldService) {

  }

  ngOnInit() {
    this.storeSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.deviceGateway = zoneModel.zone.device_gateway;
        this.zoneId = zoneModel.zoneId;
        this.loadListUpdatable();
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  loadListUpdatable() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('device_gateway', this.deviceGateway);
    this.deviceFieldService.getListUpdatable({
      search: params
    })
    .subscribe((devices) => {
      this.devices = devices;
    });
  }

  onSelectDevice(selectedDevice) {
    this.isRequesting = true;
    this.deviceFieldService.assignDeviceToZone({
      device_field_id: selectedDevice.id,
      zone_id: this.zoneId,
      link_type: 'control'
    }).subscribe(() => {
      this.modal.hide();
      this.onResolve.emit();
      this.isRequesting = false;
    }, () => {
      this.isRequesting = false;
    });
  }

  show() {
    this.selectedDevice = null;
    this.modal.show();
  }
}
