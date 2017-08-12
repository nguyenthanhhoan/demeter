import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ng2-bootstrap';

import { SharedModule } from './_shared/shared.module';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';

import { routing } from './zone.routing';

import { ZoneComponent } from './zone.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';
import { WeatherForecastModule } from '../shared/weather-forecast/weather-forecast.module';
import { ZoneSettingModule } from './setting/zone-setting.module';

import { ZoneNewComponent } from './zone-new/zone-new.component';
import { SensorDataChartComponent } from '../shared/sensor-data-chart/sensor-data-chart.component';

import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';

@NgModule({
  imports: [
    SharedModule,
    BsDropdownModule,
    ChartistModule,
    ProjectSummaryModule,
    ZoneSummaryPaneModule,
    WeatherForecastModule,
    ZoneSettingModule,
    routing
  ],
  declarations: [
    ZoneComponent,
    SensorDataChartComponent,
    ZoneNewComponent,
    ZoneSummaryComponent,
    ZoneHistoryComponent
  ]
})
export class ZoneModule { }
