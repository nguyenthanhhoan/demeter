import { NgModule } from '@angular/core';
import { routing } from './project.routing';
import { SharedModule } from './_shared/shared.module';
import { ProjectNewComponent } from './project-new/project-new.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProjectNewComponent
  ]
})
export class ProjectModule { }
