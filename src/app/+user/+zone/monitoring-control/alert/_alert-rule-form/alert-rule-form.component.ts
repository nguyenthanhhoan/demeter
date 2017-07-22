import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { DeviceFieldService } from '../../../../../core/services/device-field-service';
import { AlertRuleService } from '../../../../../core/services/alert-rule.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var $: any;
@Component({
  selector: 'alert-rule-form',
  templateUrl: './alert-rule-form.component.html',
  styleUrls: ['./alert-rule-form.component.scss']
})
export class AlertRuleFormComponent implements OnInit, OnChanges {
  projectId: number;
  zoneId: number;

  @ViewChild('form') form: any;
  submitClicked: boolean = false;

  @Input()
  alertRule: any = {
    schedule: '0 0 * * *'
  };

  oldAlertRule: any = {};

  @Input()
  type: string;

  devices: any[];

  constructor(private store: Store<any>,
              private router: Router,
              private deviceFieldService: DeviceFieldService,
              private alertRuleService: AlertRuleService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.zone && zoneModel.zone.id) {
        this.zoneId = zoneModel.zone.id;
        this.projectId = zoneModel.zone.project.id;
      }
    });
    this.initCron();
  }

  ngOnChanges() {
    if (this.alertRule.id && this.alertRule.id !== this.oldAlertRule.id) {
      Object.assign(this.oldAlertRule, this.alertRule);
      this.mapDevice();
      this.updateCronValue();
    }
  }

  initCron() {
    const { schedule } = this.alertRule;
    if (schedule && schedule.length > 0) {
      $('.cron').cron({
        initial: schedule
      });
    }
  }

  updateCronValue() {
    const { schedule } = this.alertRule;
    if (schedule && schedule.length > 0) {
      $('.cron').cron('value', schedule);
    }
  }

  fetchListDevice() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zoneId.toString());
    this.deviceFieldService.getListAssigned({
      search: params
    }).subscribe((fields) => {
      this.devices = fields;
      this.mapDevice();
    });
  }

  mapDevice() {
    if (this.devices && this.devices.length > 0 && this.alertRule.device_field_id) {
      this.alertRule.device_field = this.devices.filter((device) => {
        return device.id === this.alertRule.device_field_id;
      })[0];
    } else {
      console.log('Device list or alert_rule not fetched!');
    }
  }

  buildSubmitAlertRule(rule) {
    let submitRule = {
      id: rule.id,
      zone_id: this.zoneId,
      name: rule.name,
      device_field_id: rule.device_field.id,
      condition: rule.condition,
      value: rule.value,
      interval: rule.interval,
      live_chart_rule: rule.live_chart_rule,
      schedule: $('.cron').cron('value')
    };
    return submitRule;
  }

  create() {
    let submitAlertRule = this.buildSubmitAlertRule(this.alertRule);
    this.alertRuleService.post(this.zoneId, submitAlertRule)
    .subscribe(() => {
      this.notificationService.showMessage('Rule Alert created successfully!');
      this.router
      .navigate([`/user/project/${this.projectId}/zone/${this.zoneId}/`
        + `monitoring-control/alert/alert-rule`]);
    });
  }

  update() {
    let submitAlertRule = this.buildSubmitAlertRule(this.alertRule);
    this.alertRuleService.put(this.zoneId, submitAlertRule)
    .subscribe(() => {
      this.notificationService.showMessage('Rule Alert updated successfully!');
      this.router
      .navigate([`/user/project/${this.projectId}/zone/${this.zoneId}/`
        + `monitoring-control/alert/alert-rule`]);
    });
  }
}
