import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';

import { HeaderModule } from '../shared/layout/header/header.module';

import { ProjectFormComponent } from './form/project-form.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    HeaderModule
  ],
  declarations: [
    ProjectFormComponent
  ]
})
export class ProjectModule { }
