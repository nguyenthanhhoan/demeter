import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';

import { HeaderModule } from '../shared/layout/header/header.module';

import { ProjectFormComponent } from './form/project-form.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    HeaderModule,
    ProjectSummaryModule
  ],
  declarations: [
    ProjectFormComponent,
    ProjectListComponent
  ]
})
export class ProjectModule { }
