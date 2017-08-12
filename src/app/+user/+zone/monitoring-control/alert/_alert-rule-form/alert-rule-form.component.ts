import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';

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

  @ViewChild('effectivePeriodComponent') effectivePeriodComponent: any;

  @Input()
  alertRule: any = {
    from_time: '',
    to_time: '',
    schedule: '0 0 * * *',
  };

  oldAlertRule: any = {};

  @Input()
  type: string;

  devices: any[];
  canEdit: boolean = false;
  private zoneSubscription: ISubscription;
  private userRole: string;

  constructor(private store: Store<any>,
              private router: Router,
              private deviceFieldService: DeviceFieldService,
              private alertRuleService: AlertRuleService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zoneId = zoneModel.zoneId;
        this.projectId = zoneModel.zone.project.id;
        this.userRole = zoneModel.zone.current_user_role;
        this.fetchListDevice();
        this.checkPermission();
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

  checkPermission() {
    if (this.userRole === 'user' || this.userRole === 'guest') {
      this.canEdit = false;
    } else {
      this.canEdit = true;
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
    let submitRule = Object.assign({}, rule);
    delete submitRule.device_field;
    submitRule.zone_id = this.zoneId;
    submitRule.device_field_id = rule.device_field.id;
    submitRule.schedule = $('.cron').cron('value');
    return submitRule;
  }

  create() {
    let effectivePeriod = this.effectivePeriodComponent.getEffectivePeriod();
    if (effectivePeriod) {
      this.alertRule.from_time = effectivePeriod.from_time;
      this.alertRule.to_time = effectivePeriod.to_time;
    } else {
      // There is validation error
      return false;
    }
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
    let effectivePeriod = this.effectivePeriodComponent.getEffectivePeriod();
    if (effectivePeriod) {
      this.alertRule.from_time = effectivePeriod.from_time;
      this.alertRule.to_time = effectivePeriod.to_time;
    } else {
      // There is validation error
      return false;
    }
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
