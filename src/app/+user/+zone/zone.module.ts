import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from "../../shared/forms/validation/smartadmin-validation.module";

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';

import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneListComponent } from "./list/zone-list.component";
import { ZoneFormComponent } from "./form/zone-form.component";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    SmartadminValidationModule,
    HeaderModule,
    SidebarModule,
    ProjectSummaryModule
  ],
  declarations: [
    ZoneListComponent,
    ZoneFormComponent
  ]
})
export class ZoneModule { }
