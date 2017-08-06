import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ng2-bootstrap';

import { SharedModule } from './_shared/shared.module';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';

import { routing } from './zone.routing';

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { BreadcrumbModule } from '../shared/layout/breadcrumb/breadcrumb.module';
import { CameraModule } from '../../shared/camera/camera.module';
import { UserLayoutModule } from '../shared/layout/layout.module';

import { ZoneComponent } from './zone.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';
import { WeatherForecastModule } from '../shared/weather-forecast/weather-forecast.module';
import { ZoneSettingModule } from './setting/zone-setting.module';

import { ZoneNewComponent } from './zone-new/zone-new.component';
import { SensorDataChartComponent } from '../shared/sensor-data-chart/sensor-data-chart.component';

import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';
import { ZoneCameraComponent } from './camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';

@NgModule({
  imports: [
    SharedModule,
    BsDropdownModule,
    ChartistModule,
    CameraModule,
    HeaderModule,
    SidebarModule,
    BreadcrumbModule,
    ProjectSummaryModule,
    ZoneSummaryPaneModule,
    WeatherForecastModule,
    ZoneSettingModule,
    UserLayoutModule,
    routing
  ],
  declarations: [
    ZoneComponent,
    SensorDataChartComponent,
    ZoneNewComponent,
    ZoneSummaryComponent,
    ZoneHistoryComponent,
    ZoneCameraComponent,
    ZoneCameraDetailComponent,
  ]
})
export class ZoneModule { }
