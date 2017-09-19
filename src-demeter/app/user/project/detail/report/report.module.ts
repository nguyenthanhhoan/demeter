import { NgModule } from '@angular/core';
import { routing } from './report.routing';
import { SharedModule } from '../_shared/shared.module';
import { ReportComponent } from './report.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }
