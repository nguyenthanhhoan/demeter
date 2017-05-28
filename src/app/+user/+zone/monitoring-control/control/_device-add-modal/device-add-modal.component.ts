import { Component, OnInit, DoCheck, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';

@Component({
  selector: 'device-add-modal',
  templateUrl: './device-add-modal.component.html'
})
export class DeviceAddModalComponent implements OnInit {

  @Output() onResolve = new EventEmitter();

  project_id: number;
  zone_id: number;
  isRequesting = false;

  devices = [];
  selectedDevice: any;

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private deviceFieldService: DeviceFieldService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
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
