import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../_shared/shared.module';
import { routing } from './zone-setting.routing';
import { DeviceFieldSelectModalComponent } from './_device-field-select-modal/device-field-select-modal.component';
import { ZoneSettingEnvironmentComponent } from './environment/zone-setting-environment.component';
import { CameraSelectModalComponent } from './_camera-select-modal/camera-select-modal.component';
import { ZoneSettingCameraComponent } from './camera/zone-setting-camera.component';
import { ZoneSettingSummaryComponent } from './summary/zone-setting-summary.component';
import { ZoneSettingComponent } from './zone-setting.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
    ZoneSettingEnvironmentComponent,
    DeviceFieldSelectModalComponent,
    ZoneSettingComponent,
    ZoneSettingSummaryComponent,
    ZoneSettingCameraComponent,
    CameraSelectModalComponent
  ],
  exports: [
    ZoneSettingEnvironmentComponent
  ]
})
export class ZoneSettingModule { }
