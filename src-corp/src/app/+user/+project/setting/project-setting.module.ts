import { NgModule } from '@angular/core';

import { routing } from './project-setting.routing';

import { SharedModule } from '../_shared/shared.module';
import { ProjectSettingComponent } from './project-setting.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProjectSettingComponent,
    ProjectComponent
  ]
})
export class ProjectSettingModule { }
