import { NgModule } from '@angular/core';
import { routing } from './brand-detail.routing';
import { SharedModule } from '../_shared/shared.module';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactInfoFormComponent } from './contact-info/contact-info-form/contact-info-form.component';
import { BrandDetailComponent } from './brand-detail.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    BrandDetailComponent,
    ContactInfoComponent,
    ContactInfoFormComponent
  ],
  providers: [
  ]
})
export class BrandDetailModule { }
