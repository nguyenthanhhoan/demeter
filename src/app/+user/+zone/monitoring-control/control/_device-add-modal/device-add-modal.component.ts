import { Component, OnInit, DoCheck, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Store } from '@ngrx/store';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';

@Component({
  selector: 'device-add-modal',
  templateUrl: './device-add-modal.component.html'
})
export class DeviceAddModalComponent implements OnInit {

  @Output() onResolve = new EventEmitter();

  zone_id: number;
  isRequesting = false;

  devices = [];
  selectedDevice: any;

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private store: Store<any>,
              private deviceFieldService: DeviceFieldService) {

    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
    });
  }

  ngOnInit() {
    this.deviceFieldService.getListUpdatable().subscribe((devices) => {
      this.devices = devices;
    });
  }

  onSelectDevice(selectedDevice) {
    this.isRequesting = true;
    this.deviceFieldService.assignDeviceToZone({
      device_field_id: selectedDevice.id,
      zone_id: this.zone_id,
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
