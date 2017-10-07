import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';
import { ChartistModule } from '../../../shared/graphs/chartist/chartist.module';

import { WeatherForecastComponent } from './weather-forecast.component';

@NgModule({
  imports: [
    CommonModule,
    ChartistModule,
    RouterModule
  ],
  declarations: [
    WeatherForecastComponent
  ],
  exports: [
    WeatherForecastComponent
  ]
})
export class WeatherForecastModule {

}
