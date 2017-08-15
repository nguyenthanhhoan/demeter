import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ZoneHistoryComponent } from './zone-history.component';
import { MultipleChartComponent } from './multiple-chart/multiple-chart.component';
import { SingleChartComponent } from './single-chart/single-chart.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ZoneHistoryComponent,
    MultipleChartComponent,
    SingleChartComponent
  ],
  providers: [
  ]
})
export class ZoneHistoryModule {

}
