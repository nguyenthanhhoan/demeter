import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ng2-bootstrap';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';

import { HeaderModule } from '../shared/layout/header/header.module';
import { UserLayoutModule } from '../shared/layout/layout.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';

import { routing } from './project.routing';

import { SharedModule } from './_shared/shared.module';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectSummaryComponent } from './summary/project-summary.component';

@NgModule({
  imports: [
    BsDropdownModule,
    ChartistModule,
    HeaderModule,
    ProjectSummaryModule,
    UserLayoutModule,
    ZoneSummaryPaneModule,
    SharedModule,
    routing
  ],
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    ProjectNewComponent,
    ProjectSummaryComponent
  ]
})
export class ProjectModule { }
