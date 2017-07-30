import { NgModule } from '@angular/core';

import { routing } from './project-setting.routing';

import { SharedModule } from '../_shared/shared.module';
import { ProjectSettingComponent } from './project-setting.component';
import { MemberComponent } from './member/member.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProjectSettingComponent,
    MemberComponent,
    ProjectComponent
  ]
})
export class ProjectSettingModule { }
