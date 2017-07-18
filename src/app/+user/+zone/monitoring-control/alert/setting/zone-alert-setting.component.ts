import {
  Component, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';

import { AlertRuleService } from '../../../../../core/services/alert-rule.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

@Component({
  selector: 'zone-alert-setting',
  templateUrl: './zone-alert-setting.component.html',
  styleUrls: ['./zone-alert-setting.component.scss']
})
export class ZoneAlertSettingComponent implements OnInit {
  zoneId: number;
  alert_rules: any[];

  constructor(private store: Store<any>,
              private alertRuleService: AlertRuleService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile((zoneModel: any) => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel) => {
      if (zoneModel.zoneId) {
        this.zoneId = zoneModel.zoneId;
        this.loadAlertRule();
      }
    });
  }

  loadAlertRule() {
    this.alertRuleService.list(this.zoneId)
    .subscribe((alert_rules) => {
      this.alert_rules = alert_rules;
    });
  }

  remove(field) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this alert rule?`
    }, () => {
      this.alertRuleService.delete(this.zoneId, field.id)
      .subscribe(() => {
        this.notificationService.showMessage(`Remove alert rule successfully!`);
        this.loadAlertRule();
      });
    });
  }

  changeValue(alertRule) {

    let newValue = true;
    if (alertRule.is_active === true) {
      newValue = false;
    }
    alertRule.isRunning = true;
    this.alertRuleService.put(this.zoneId, {
      id: alertRule.id,
      is_active: newValue
    })
    .subscribe(() => {
      this.notificationService.showMessage('Alert Rule active successfully!');
      alertRule.isRunning = false;
      alertRule.is_active = newValue;
    }, () => {
      this.notificationService.showErrorMessage({
        content: 'Cannot active Alert Rule!'
      });
      alertRule.isRunning = false;
    });
  }
}
