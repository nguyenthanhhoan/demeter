import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartistModule } from '../../../shared/graphs/chartist/chartist.module';

import { WeatherForecastModule } from '../weather-forecast/weather-forecast.module';
import { ProjectSummaryComponent } from './project-summary.component';

@NgModule({
  imports: [
    CommonModule,
    ChartistModule,
    RouterModule,
    WeatherForecastModule,
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
