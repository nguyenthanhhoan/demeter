import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from "../../shared/forms/validation/smartadmin-validation.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { IntegrationModule } from '../../shared/integration/integration.module';

import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';
import { ZoneListComponent } from "./list/zone-list.component";
import { ZoneFormComponent } from "./form/zone-form.component";
import { ZoneSummaryComponent } from "./summary/zone-summary.component";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    IntegrationModule,
    HeaderModule,
    SidebarModule,
    ProjectSummaryModule,
    ZoneSummaryPaneModule
  ],
  declarations: [
    ZoneListComponent,
    ZoneFormComponent,
    ZoneSummaryComponent
  ]
})
export class ZoneModule { }
