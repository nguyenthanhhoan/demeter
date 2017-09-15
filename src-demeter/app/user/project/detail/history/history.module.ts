import { NgModule } from '@angular/core';
import { routing } from './history.routing';
import { SharedModule } from '../_shared/shared.module';
import { HistoryComponent } from './history.component';
import { MultipleChartComponent } from './multiple-chart/multiple-chart.component';
import { SingleChartComponent } from './single-chart/single-chart.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    HistoryComponent,
    MultipleChartComponent,
    SingleChartComponent
  ]
})
export class HistoryModule { }
