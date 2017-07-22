import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ng2-bootstrap';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import {
  SmartadminValidationModule
} from '../../shared/forms/validation/smartadmin-validation.module';

import { HeaderModule } from '../shared/layout/header/header.module';
import { IntegrationModule } from '../../shared/integration/integration.module';
import { UserLayoutModule } from '../shared/layout/layout.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';

import { routing } from './project.routing';

import { ProjectComponent } from './project.component';
import { ProjectFormComponent } from './form/project-form.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectSummaryComponent } from './summary/project-summary.component';
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
    ProjectSummaryModule,
    UserLayoutModule,
    ZoneSummaryPaneModule,
    routing
  ],
  declarations: [
    ProjectComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ProjectSummaryComponent
  ]
})
export class ProjectModule { }
