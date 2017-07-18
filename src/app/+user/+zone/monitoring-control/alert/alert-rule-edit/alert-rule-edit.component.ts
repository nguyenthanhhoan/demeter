import { ActivatedRoute } from '@angular/router';
import {
  Component
} from '@angular/core';
import { Store } from '@ngrx/store';

import { AlertRuleService } from '../../../../../core/services/alert-rule.service';

@Component({
  selector: 'alert-rule-edit',
  templateUrl: './alert-rule-edit.component.html'
})
export class AlertRuleEditComponent {

  alertRuleId: number;
  zoneId: number;
  alertRule: any = {};
  constructor(private store: Store<any>,
              private route: ActivatedRoute,
              private alertRuleService: AlertRuleService) {
  }

  ngOnInit() {
    this.alertRuleId = this.route.snapshot.params['alert_rule_id'];
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
    this.alertRuleService.getOne(this.zoneId, this.alertRuleId)
    .subscribe((alertRule: any) => {
      this.alertRule = alertRule;
    });
  }
}
