import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../../shared/smartadmin.module';
import { NestableListModule } from '../../../shared/ui/nestable-list/nestable-list.module';
import {
  DeviceFieldSelectModalComponent
} from './_device-field-select-modal/device-field-select-modal.component';
import { ZoneSettingEnvironmentComponent } from './environment/zone-setting-environment.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    NestableListModule
  ],
  declarations: [
    ZoneSettingEnvironmentComponent,
    DeviceFieldSelectModalComponent
  ],
  exports: [
    ZoneSettingEnvironmentComponent
  ]
})
export class ZoneSettingModule { }
