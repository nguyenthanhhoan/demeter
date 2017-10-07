import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

import { ImageReportComponent } from './image-report/image-report.component';
import { ImageReportFormComponent } from './image-report-form/image-report-form.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ImageReportComponent,
    ImageReportFormComponent
  ],
  exports: [
    ImageReportComponent
  ]
})
export class OverviewModule {

}
