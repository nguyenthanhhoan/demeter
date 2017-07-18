import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../../../shared/smartadmin.module';
import { SmartadminInputModule } from '../../../../shared/forms/input/smartadmin-input.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { routing } from './zone-alert.routing';
import { ZoneAlertComponent } from './zone-alert.component';
import { ZoneAlertListComponent } from './list/zone-alert-list.component';
import { ZoneAlertSettingComponent } from './setting/zone-alert-setting.component';
import { AlertRuleFormComponent } from './_alert-rule-form/alert-rule-form.component';
import { AlertRuleNewComponent } from './alert-rule-new/alert-rule-new.component';
import { AlertRuleEditComponent } from './alert-rule-edit/alert-rule-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminInputModule,
    PaginationModule.forRoot(),
    routing
  ],
  declarations: [
    ZoneAlertComponent,
    ZoneAlertListComponent,
    ZoneAlertSettingComponent,
    AlertRuleFormComponent,
    AlertRuleNewComponent,
    AlertRuleEditComponent
  ],
  providers: [
  ]
})
export class ZoneAlertModule {

}
