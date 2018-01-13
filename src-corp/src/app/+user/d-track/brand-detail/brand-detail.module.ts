import { NgModule } from '@angular/core';
import { routing } from './brand-detail.routing';
import { SharedModule } from '../_shared/shared.module';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactInfoFormComponent } from './contact-info/contact-info-form/contact-info-form.component';
import { BrandDetailComponent } from './brand-detail.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CommunityFeedbackComponent } from './community-feedback/community-feedback.component';
import { MediaFeedbackFormComponent } from './community-feedback/media-feedback-form/media-feedback-form.component';
@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    BrandDetailComponent,
    ContactInfoComponent,
    ContactInfoFormComponent,
    CertificatesComponent,
    CommunityFeedbackComponent,
    MediaFeedbackFormComponent
  ],
  providers: [
  ]
})
export class BrandDetailModule { }
