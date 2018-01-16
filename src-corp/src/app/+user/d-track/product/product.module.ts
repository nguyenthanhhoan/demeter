import { NgModule } from '@angular/core';
import { routing } from './product.routing';
import { SharedModule } from '../_shared/shared.module';

import {ProductComponent} from './product.component';

import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MaterialsComponent } from './product-detail/materials/materials.component';
import { ProductInfoComponent } from './product-detail/product-info/product-info.component';
import { ManufacturerComponent } from './product-detail/manufacturer/manufacturer.component';
import { PackComponent } from './product-detail/pack/pack.component';
import { DistributionComponent } from './product-detail/distribution/distribution.component';
import { MaterialsFormComponent } from './product-detail/materials/materials-form/materials-form.component';
import { DistributionFormComponent } from './product-detail/distribution/distribution-form/distribution-form.component';
import { PackFormComponent } from './product-detail/pack/pack-form/pack-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ManufacturerFormComponent } from './product-detail/manufacturer/manufacturer-form/manufacturer-form.component';
import { ManufacturingProcessesFormComponent } from './product-detail/manufacturer/manufacturing-processes-form/manufacturing-processes-form.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    MaterialsComponent,
    ProductInfoComponent,
    ManufacturerComponent,
    PackComponent,
    DistributionComponent,
    MaterialsFormComponent,
    DistributionFormComponent,
    PackFormComponent,
    ManufacturerFormComponent,
    ManufacturingProcessesFormComponent,
    PackFormComponent,
    ProductFormComponent
  ],
  providers: [
  ]
})
export class ProductModule { }
