import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule as UserSharedModule } from '../../../_shared/shared.module';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  imports: [
    RouterModule,
    UserSharedModule
  ],
  declarations: [
    ProjectFormComponent
  ],
  exports: [
    UserSharedModule,
    ProjectFormComponent
  ]
})
export class SharedModule {
}
