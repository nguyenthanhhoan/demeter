import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from '../../../shared/smartadmin.module';
import {
  SmartadminValidationModule
} from '../../../shared/forms/validation/smartadmin-validation.module';

import { SharedModule as AppSharedModule } from '../../../shared/shared.module';
import { IntegrationModule } from '../../../shared/integration/integration.module';

import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminValidationModule,
    IntegrationModule,
    AppSharedModule
  ],
  declarations: [
    ProjectFormComponent
  ],
  exports: [
    CommonModule,
    SmartadminModule,
    SmartadminValidationModule,
    IntegrationModule,
    AppSharedModule,

    ProjectFormComponent
  ]
})
export class SharedModule {
}
