import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ng2-bootstrap';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import {
  SmartadminValidationModule
} from '../../shared/forms/validation/smartadmin-validation.module';
import { SharedModule } from '../../shared/shared.module';

import { HeaderModule } from '../shared/layout/header/header.module';
import { IntegrationModule } from '../../shared/integration/integration.module';
import { UserLayoutModule } from '../shared/layout/layout.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';

import { routing } from './project.routing';

import { ProjectFormComponent } from './_shared/project-form/project-form.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectSummaryComponent } from './summary/project-summary.component';
import { ProjectSettingComponent } from './setting/project-setting.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
    ProjectNewComponent,
    ProjectSummaryComponent,
    ProjectSettingComponent
  ]
})
export class ProjectModule { }
