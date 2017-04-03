import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminDatatableModule } from '../shared/ui/datatable/smartadmin-datatable.module';
import { ChartistModule } from '../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from '../shared/forms/validation/smartadmin-validation.module';
import { IntegrationModule } from '../shared/integration/integration.module';

import { routing } from './admin.routing';
import { DashboardModule } from './+dashboard/dashboard.module';

import { ProjectFormComponent } from './+project/form/project-form.component';
import { ProjectListComponent } from './+project/list/project-list.component';

import { ZoneListComponent } from './+zone/list/zone-list.component';
import { CameraListComponent } from './+camera/list/camera-list.component';

import { ProjectService } from './shared/services/project.service';
import { ZoneService } from './shared/services/zone.service';
import { CameraService } from './shared/services/camera.service';

@NgModule({
  imports: [
    SmartadminModule,
    SmartadminDatatableModule,
    DropdownModule,
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
    CameraListComponent
  ],
  providers: [
    ProjectService,
    ZoneService,
    CameraService
  ],
})
export class AdminModule {

}
