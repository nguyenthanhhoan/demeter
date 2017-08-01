import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from '../../../../shared/smartadmin.module';
import { SmartadminInputModule } from '../../../../shared/forms/input/smartadmin-input.module';
import { PaginationModule } from 'ngx-bootstrap/ng2-bootstrap';

import { SharedModule as AppSharedModule } from '../../../../shared/shared.module';
import { EffectivePeriodComponent } from './effective-period/effective-period.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminInputModule,
    PaginationModule.forRoot(),
    AppSharedModule
  ],
  declarations: [
    EffectivePeriodComponent
  ],
  exports: [
    CommonModule,
    SmartadminModule,
    SmartadminInputModule,
    PaginationModule,
    AppSharedModule,
    EffectivePeriodComponent
  ]
})
export class SharedModule {
}
