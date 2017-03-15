import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ChartistModule } from '../../../shared/graphs/chartist/chartist.module';

import { ProjectSummaryComponent } from './project-summary.component';

@NgModule({
  imports: [
    CommonModule,
    ChartistModule
  ],
  declarations: [
    ProjectSummaryComponent
  ],
  exports: [
    ProjectSummaryComponent
  ]
})
export class ProjectSummaryModule {

}
