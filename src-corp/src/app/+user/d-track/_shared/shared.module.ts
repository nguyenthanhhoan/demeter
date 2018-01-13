import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../_shared/shared.module';
import { UserLayoutModule } from './layout/layout.module';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { ImageFormComponent } from './image-form/image-form.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    UserLayoutModule
  ],
  declarations: [
    BrandFormComponent,
    ImageFormComponent
  ],
  exports: [
    CommonModule,
    AppSharedModule,
    BrandFormComponent,
    ImageFormComponent
  ]
})
export class SharedModule {
}
