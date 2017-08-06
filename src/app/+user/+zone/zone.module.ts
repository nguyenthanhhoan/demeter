import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ng2-bootstrap';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule }
        from '../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../shared/forms/input/smartadmin-input.module';
import { NestableListModule } from '../../shared/ui/nestable-list/nestable-list.module';

import { routing } from './zone.routing';

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { BreadcrumbModule } from '../shared/layout/breadcrumb/breadcrumb.module';
import { IntegrationModule } from '../../shared/integration/integration.module';
import { CameraModule } from '../../shared/camera/camera.module';
import { UserLayoutModule } from '../shared/layout/layout.module';

import { ZoneComponent } from './zone.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';
import { WeatherForecastModule } from '../shared/weather-forecast/weather-forecast.module';
import { ZoneSettingModule } from './setting/zone-setting.module';

import { ZoneFormComponent } from '../shared/zone-form/zone-form.component';
import { SensorDataChartComponent } from '../shared/sensor-data-chart/sensor-data-chart.component';

import { ZoneFormComponent as ZoneAddFormComponent } from './form/zone-form.component';
import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';
import { ZoneCameraComponent } from './camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';

/* Setting */
import { ZoneSettingComponent } from './setting/zone-setting.component';
import { ZoneSettingSummaryComponent } from './setting/summary/zone-setting-summary.component';
import { ZoneSettingCameraComponent } from './setting/camera/zone-setting-camera.component';
import {
  CameraSelectModalComponent
} from './setting/_camera-select-modal/camera-select-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    BsDropdownModule,
    ChartistModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    NestableListModule,
    IntegrationModule,
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
    ZoneFormComponent,
    SensorDataChartComponent,

    ZoneAddFormComponent,
    ZoneSummaryComponent,
    ZoneHistoryComponent,
    ZoneCameraComponent,
    ZoneCameraDetailComponent,

    /* Setting */
    ZoneSettingComponent,
    ZoneSettingSummaryComponent,
    ZoneSettingCameraComponent,
    CameraSelectModalComponent,
  ]
})
export class ZoneModule { }
