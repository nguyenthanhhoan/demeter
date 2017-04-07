import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from "../../shared/forms/validation/smartadmin-validation.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { BreadcrumbModule } from '../shared/layout/breadcrumb/breadcrumb.module';
import { IntegrationModule } from '../../shared/integration/integration.module';
import { CameraModule } from '../../shared/camera/camera.module';

import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';

import { ZoneListComponent } from "./list/zone-list.component";
import { ZoneFormComponent } from "./form/zone-form.component";
import { ZoneSummaryComponent } from "./summary/zone-summary.component";
import { ZoneHistoryComponent } from "./history/zone-history.component";
import { ZoneCameraComponent } from "./camera/zone-camera.component";
import { ZoneCameraDetailComponent } from "./camera/camera-detail/zone-camera-detail.component";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    IntegrationModule,
    CameraModule,
    HeaderModule,
    SidebarModule,
    BreadcrumbModule,
    ProjectSummaryModule,
    ZoneSummaryPaneModule
  ],
  declarations: [
    ZoneListComponent,
    ZoneFormComponent,
    ZoneSummaryComponent,
    ZoneHistoryComponent,
    ZoneCameraComponent,
    ZoneCameraDetailComponent
  ]
})
export class ZoneModule { }
