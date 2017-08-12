import { URLSearchParams } from '@angular/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { ISubscription } from 'rxjs/Subscription';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';

@Component({
  selector: 'device-field-select-modal',
  templateUrl: './device-field-select-modal.component.html'
})
export class DeviceFieldSelectModalComponent implements OnInit, OnDestroy {

  @Input() mode: string;

  @Output() onResolve = new EventEmitter();

  isRequesting = false;
  deviceFields = [];
  selectedDeviceField: any;
  @ViewChild('modal') modal: ModalDirective;

  private zoneId: number;
  private deviceGateway: string;
  private storeSubscription: ISubscription;

  constructor(private store: Store<any>,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService) {

  }

  ngOnInit() {
    this.storeSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.deviceGateway = zoneModel.zone.device_gateway;
        this.zoneId = zoneModel.zoneId;
        this.load();
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  load() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('device_gateway', this.deviceGateway);
    this.deviceFieldService.getList({
      search: params
    }).subscribe((deviceFields) => {
      this.deviceFields = deviceFields;
    });
  }

  onSelectDeviceField() {
    this.isRequesting = true;
    this.assignDeviceField();
  }

  assignDeviceField() {
    this.deviceFieldService.assignDeviceToZone({
      device_field_id: this.selectedDeviceField.id,
      zone_id: this.zoneId,
      link_type: 'data'
    }).subscribe(() => {
      this.isRequesting = false;
      this.modal.hide();
      this.notificationService.showMessage('Assign input successfully!');
      this.onResolve.emit();
    }, () => {
      this.isRequesting = false;
    });
  }

  show() {
    this.modal.show();
  }
}
