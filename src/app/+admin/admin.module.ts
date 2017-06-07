import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ng2-bootstrap';
import { SmartadminModule } from '../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../shared/ui/datatable/smartadmin-datatable.module';
import { ChartistModule } from '../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from '../shared/forms/validation/smartadmin-validation.module';
import { IntegrationModule } from '../shared/integration/integration.module';

import { routing } from './admin.routing';
import { DashboardModule } from './+dashboard/dashboard.module';

import { ProjectListComponent } from './+project/list/project-list.component';
import { ProjectFormComponent } from './+project/form/project-form.component';

import { ZoneListComponent } from './+zone/list/zone-list.component';
import { CameraListComponent } from './+camera/list/camera-list.component';

import { DeviceListComponent } from './+device/list/device-list.component';
import { DeviceFormComponent } from './+device/form/device-form.component';

import { DeviceFieldListComponent } from './+device/device-field/list/device-field-list.component';
import { DeviceFieldFormComponent } from './+device/device-field/form/device-field-form.component';

import { CameraFormComponent } from './+camera/form/camera-form.component';

import { ProjectService } from './shared/services/project.service';
import { ZoneService } from './shared/services/zone.service';
import { CameraService } from './shared/services/camera.service';
import { DeviceService } from './shared/services/device.service';
import { DeviceFieldService } from './shared/services/device-field.service';

@NgModule({
  imports: [
    SmartadminModule,
    SmartadminDatatableModule,
    BsDropdownModule,
    SmartadminValidationModule,
    ChartistModule,
    IntegrationModule,
    routing,
    DashboardModule
  ],
  declarations: [
    ProjectFormComponent,
    ProjectListComponent,
    ZoneListComponent,
    CameraListComponent,

    DeviceListComponent,
    DeviceFormComponent,
    DeviceFieldListComponent,
    DeviceFieldFormComponent,

    CameraFormComponent
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
