import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../_shared/shared.module';
import { UserLayoutModule } from './layout/layout.module';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { BrandInfoComponent } from './brand-info/brand-info.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    UserLayoutModule
  ],
  declarations: [
    BrandFormComponent,
    ImageFormComponent,
    BrandInfoComponent,
    ProductCardComponent
  ],
  exports: [
    CommonModule,
    AppSharedModule,
    BrandFormComponent,
    ImageFormComponent,
    BrandInfoComponent,
    ProductCardComponent
  ]
})
export class SharedModule {
}
