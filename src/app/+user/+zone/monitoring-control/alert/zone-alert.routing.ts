import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertRuleNewComponent } from './alert-rule-new/alert-rule-new.component';
import { AlertRuleEditComponent } from './alert-rule-edit/alert-rule-edit.component';
import { ZoneAlertComponent } from './zone-alert.component';

export const routes: Routes = [{
    path: '',
    component: ZoneAlertComponent
  }, {
    path: 'alert-rule/new',
    component: AlertRuleNewComponent
  }, {
    path: 'alert-rule/:alert_rule_id',
    component: AlertRuleEditComponent
  }, {
    path: 'alert-rule',
    component: ZoneAlertComponent
  }
];

export const routing = RouterModule.forChild(routes);
