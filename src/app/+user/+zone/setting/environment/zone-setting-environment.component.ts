import { Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';
import { ZoneService } from '../../../../core/services/zone.service';

@Component({
  selector: 'zone-setting-environment',
  templateUrl: './zone-setting-environment.component.html',
  styleUrls: ['./zone-setting-environment.component.scss']
})
export class ZoneSettingEnvironmentComponent implements DoCheck, OnInit {

  @Input()
  zone: any;

  @Output() onRefresh = new EventEmitter();
  @ViewChild('sortModal') public sortModal: ModalDirective;

  oldZone: any = {};
  zoneId: number;
  sortableList: any;

  sort_fields = [];
  isRequesting = false;


  constructor(private store: Store<any>,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel: any) => {
      this.zoneId = zoneModel.zoneId;
    });
  }

  reloadZone() {
    this.onRefresh.emit({});
  }

  ngDoCheck() {
    let changeDetected = false;
    if (this.zone && this.zone.id && this.oldZone.id !== this.zone.id) {
      changeDetected = true;
    }

    if (this.zone && this.zone.data_device_fields && this.zone.data_device_fields.length
      && this.sort_fields.length !== this.zone.data_device_fields.length) {

        changeDetected = true;
    }

    if (changeDetected) {
      this.oldZone = {
        id: this.zone.id,
      };
      this.initSortList();
    }
  }

  initSortList() {
    this.sort_fields = [];
    this.zone.data_device_fields.forEach((field) => {
      this.sort_fields.push({
        id: field.id,
        content: field.name
      });
    });

    // Render UI of nestable-list
    if (this.sortableList) {
      this.sortableList.render();
    }
  }

  onChangeList(event) {
    event.forEach((element, index) => {
      let foundEle = this.sort_fields.find((okr) => {
        return okr.id === element.id;
      });
      if (foundEle) {
        foundEle.order = index;
      } else {
        console.error('Cannot find element', element);
      }
    });
    this.sort_fields = _.sortBy(this.sort_fields, ['order']);
  }

  unAssignDeviceField(deviceField) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Input?'
    }, () => {
      this.deviceFieldService.unassignDeviceToZone({
        zone_id: this.zoneId,
        link_type: 'data',
        device_field_id: deviceField.id
      }).subscribe((fields) => {
        this.notificationService.showMessage('Remove Input successfully!');
        this.reloadZone();
      });
    });
  }

  save() {
    let submit_device_fields = [];
    this.sort_fields.forEach((element, index) => {
      let submit_device_field: any = {
        device_field_id: element.id,
        link_type: 'data',
        zone_id: this.zoneId,
        order: index
      };
      submit_device_fields.push(submit_device_field);
    });

    this.isRequesting = true;
    this.deviceFieldService.updateOrder({device_fields: submit_device_fields})
    .subscribe(() => {
      this.reloadZone();
      this.sortModal.hide();
      this.isRequesting = false;
    }, () => {
      this.isRequesting = false;
    });
  }
}
