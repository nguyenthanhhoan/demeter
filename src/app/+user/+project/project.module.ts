import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from "../../shared/forms/validation/smartadmin-validation.module";

import { HeaderModule } from '../shared/layout/header/header.module';
import { IntegrationModule } from '../../shared/integration/integration.module';

import { ProjectFormComponent } from './form/project-form.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    BsDropdownModule,
    SmartadminValidationModule,
    ChartistModule,
    HeaderModule,
    IntegrationModule,
    ProjectSummaryModule
  ],
  declarations: [
    ProjectFormComponent,
    ProjectListComponent
  ]
})
export class ProjectModule { }
