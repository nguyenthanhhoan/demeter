import { Component, OnInit, DoCheck, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';

@Component({
  selector: 'device-field-select-modal',
  templateUrl: './device-field-select-modal.component.html'
})
export class DeviceFieldSelectModalComponent implements OnInit {

  @Input() mode: string;

  @Output() onResolve = new EventEmitter();

  zoneId: number;
  isRequesting = false;

  deviceFields = [];
  selectedDeviceField: any;

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService) {

  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel: any) => {
      this.zoneId = zoneModel.zoneId;
      this.load();
    });
  }

  load() {
    this.deviceFieldService.getList().subscribe((deviceFields) => {
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
