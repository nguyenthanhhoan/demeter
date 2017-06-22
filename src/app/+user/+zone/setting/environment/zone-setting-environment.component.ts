import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';
import { ZoneService } from '../../../../core/services/zone.service';

@Component({
  selector: 'zone-setting-environment',
  templateUrl: './zone-setting-environment.component.html',
  styleUrls: ['./zone-setting-environment.component.scss']
})
export class ZoneSettingEnvironmentComponent implements DoCheck {

  @Input()
  zone: any;

  @Output() onRefresh = new EventEmitter();

  oldZone: any = {};
  project_id: number;
  zone_id: number;
  sortableList: any;

  sort_fields = [];
  isRequesting = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService,
              private zoneService: ZoneService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  reloadZone() {
    this.onRefresh.emit({});
  }

  ngDoCheck() {
    let changeDetected = false;
    if (this.zone && this.zone.id && this.oldZone.id !== this.zone.id) {
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
        zone_id: this.zone_id,
        link_type: 'data',
        device_field_id: deviceField.id
      }).subscribe((fields) => {
        this.notificationService.showMessage('Remove Input successfully!');
        this.reloadZone();
      });
    });
  }


  save() {
    // let submit_okrs = [];
    // this.sort_fields.forEach((element, index) => {
    //   let submit_okr: any = {
    //     zone_id: this.zone_id,
    //     order: index
    //   };
    //   submit_okrs.push(submit_okr);
    // });

    alert('Not implemented yet!');

    // this.isRequesting = true;
    // this.okrService.update_batch(this.zone_id, {
    //   okrs: submit_okrs
    // })
    // .subscribe(() => {
    //   this.onResolve.emit();
    //   this.okrConfigureModal.hide();
    //   this.isRequesting = false;
    // }, () => {
    //   this.isRequesting = false;
    // });
  }
}
