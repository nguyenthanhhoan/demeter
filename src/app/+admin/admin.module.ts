import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './admin.routing';

import { SharedModule } from './_shared/shared.module';
import { DashboardModule } from './+dashboard/dashboard.module';

import { ProjectListComponent } from './+project/list/project-list.component';
import { ProjectFormComponent } from './+project/form/project-form.component';

import { ZoneListComponent } from './+zone/list/zone-list.component';

import { DeviceListComponent } from './+device/list/device-list.component';
import { DeviceFormComponent } from './+device/form/device-form.component';

import { DeviceFieldListComponent } from './+device/device-field/list/device-field-list.component';
import { DeviceFieldFormComponent } from './+device/device-field/form/device-field-form.component';

import { ProjectService } from './shared/services/project.service';
import { ZoneService } from './shared/services/zone.service';
import { CameraService } from './shared/services/camera.service';
import { DeviceService } from './shared/services/device.service';
import { DeviceFieldService } from './shared/services/device-field.service';

@NgModule({
  imports: [
    routing,
    DashboardModule,
    SharedModule
  ],
  declarations: [
    ProjectFormComponent,
    ProjectListComponent,
    ZoneListComponent,
    DeviceListComponent,
    DeviceFormComponent,
    DeviceFieldListComponent,
    DeviceFieldFormComponent,
  ],
  providers: [
    ProjectService,
    ZoneService,
    CameraService,
    DeviceService,
    DeviceFieldService
  ],
})
export class AdminModule {

}
