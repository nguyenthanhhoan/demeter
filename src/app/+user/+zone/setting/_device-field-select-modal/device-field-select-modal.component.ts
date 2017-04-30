import { Component, OnInit, DoCheck, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { ZoneService } from '../../../../core/services/zone.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';

@Component({
  selector: 'device-field-select-modal',
  templateUrl: './device-field-select-modal.component.html'
})
export class DeviceFieldSelectModalComponent implements OnInit {

  @Input() mode: string;

  @Output() onResolve = new EventEmitter();

  project_id: number;
  zone_id: number;
  isRequesting = false;

  deviceFields = [];
  selectedDeviceField: any;

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private deviceFieldService: DeviceFieldService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.deviceFieldService.getList().subscribe((deviceFields) => {
      this.deviceFields = deviceFields;
    });
  }

  onSelectDeviceField() {
    this.isRequesting = true;
    this.assignDeviceField();
  }

  assignDeviceField() {
    this.zoneService.assignDeviceField(this.project_id, this.zone_id, this.selectedDeviceField.id)
    .subscribe((data) => {
      this.isRequesting = false;
      this.modal.hide();
      this.notificationService.showMessage('Assign input successfully!');
      this.onResolve.emit();
    }, (error) => {
      this.isRequesting = false;
    });
  }

  show() {
    this.modal.show();
  }
}
