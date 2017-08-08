import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as UserSharedModule } from '../../_shared/shared.module';

import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  imports: [
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
