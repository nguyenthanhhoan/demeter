import { NgModule } from '@angular/core';
import { routing } from './project-detail.routing';
import { SharedModule } from './_shared/shared.module';
import { ProjectDetailComponent } from './project-detail.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProjectDetailComponent
  ]
})
export class ProjectDetailModule { }
