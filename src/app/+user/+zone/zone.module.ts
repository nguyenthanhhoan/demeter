import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ng2-bootstrap';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule }
        from '../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../shared/forms/input/smartadmin-input.module';
import { NestableListModule } from '../../shared/ui/nestable-list/nestable-list.module';

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { BreadcrumbModule } from '../shared/layout/breadcrumb/breadcrumb.module';
import { IntegrationModule } from '../../shared/integration/integration.module';
import { CameraModule } from '../../shared/camera/camera.module';

import { ZoneComponent } from './zone.component';
import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';
import { WeatherForecastModule } from '../shared/weather-forecast/weather-forecast.module';
import { MonitoringControlModule } from './monitoring-control/monitoring-control.module';
import { ZoneSettingModule } from './setting/zone-setting.module';

import { ZoneFormComponent } from '../shared/zone-form/zone-form.component';
import { SensorDataChartComponent } from '../shared/sensor-data-chart/sensor-data-chart.component';

import { ZoneListComponent } from './list/zone-list.component';
import { ZoneFormComponent as ZoneAddFormComponent } from './form/zone-form.component';
import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';
import { ZoneCameraComponent } from './camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';
import { ZoneWeatherComponent } from './crop-management/weather/zone-weather.component';

/* Setting */
import { ZoneSettingComponent } from './setting/zone-setting.component';
import { ZoneSettingSummaryComponent } from './setting/summary/zone-setting-summary.component';
import { ZoneSettingCameraComponent } from './setting/camera/zone-setting-camera.component';
import {
  CameraSelectModalComponent
} from './setting/_camera-select-modal/camera-select-modal.component';

/* Daily report */
import { ZoneDailyReportComponent } from './crop-management/daily-report/zone-daily-report.component';
import { ZoneDailyReportOverviewComponent } from './crop-management/daily-report/overview/zone-daily-report-overview.component';
import { IrrigationFormComponent } from './crop-management/daily-report/overview/irrigation-form/irrigation-form.component';
import { PestDiseaseFormComponent } from './crop-management/daily-report/overview/pest-disease-form/pest-disease-form.component';
import { ImageReportFormComponent } from './crop-management/daily-report/overview/image-report-form/image-report-form.component';
import {
  NoteFormComponent
} from './crop-management/daily-report/overview/note-form/note-form.component';
import {
  MachineryFormComponent
} from './crop-management/daily-report/usage/machinery-form/machinery-form.component';
import {
  FuelFormComponent
} from './crop-management/daily-report/usage/fuel-form/fuel-form.component';
import { ZoneDailyReportEnvironmentComponent } from './crop-management/daily-report/environment/zone-daily-report-environment.component';
import { ZoneDailyReportUsageComponent } from './crop-management/daily-report/usage/zone-daily-report-usage.component';
import {
  WorkHourFormComponent
} from './crop-management/daily-report/usage/work-hour-form/work-hour-form.component';
import {
  FertilizerFormComponent
} from './crop-management/daily-report/usage/fertilizer-form/fertilizer-form.component';
import {
  PesticideFormComponent
} from './crop-management/daily-report/usage/pesticide/pesticide-form.component';
import {
  WaterFormComponent
} from './crop-management/daily-report/usage/water/water-form.component';

import {
  ZoneDailyReportHarvestingComponent
} from './crop-management/daily-report/harvesting/zone-daily-report-harvesting.component';
import {
  HarvestingFormComponent
} from './crop-management/daily-report/harvesting/harvesting-form/harvesting-form.component';

/* Zone OKR */
import { ZoneOKRComponent } from './crop-management/okr/zone-okr.component';
import { OKRTableComponent } from './crop-management/okr/okr-table/okr-table.component';
import { OKRFormComponent } from './crop-management/okr/okr-form/okr-form.component';
import {
  OKRConfigureModalComponent
} from './crop-management/okr/_okr-configure-modal/okr-configure-modal.component';
import {
  OKRRenameModalComponent
} from './crop-management/okr/_okr-rename-modal/okr-rename-modal.component';

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
    MonitoringControlModule,
    ZoneSettingModule
  ],
  declarations: [
    ZoneComponent,
    ZoneFormComponent,
    SensorDataChartComponent,

    ZoneListComponent,
    ZoneAddFormComponent,
    ZoneSummaryComponent,
    ZoneHistoryComponent,
    ZoneCameraComponent,
    ZoneCameraDetailComponent,
    ZoneWeatherComponent,

    /* Setting */
    ZoneSettingComponent,
    ZoneSettingSummaryComponent,
    ZoneSettingCameraComponent,
    CameraSelectModalComponent,

    /* Daily report */
    ZoneDailyReportComponent,
    ZoneDailyReportOverviewComponent,
    ZoneDailyReportEnvironmentComponent,
    ZoneDailyReportUsageComponent,
    IrrigationFormComponent,
    PestDiseaseFormComponent,
    ImageReportFormComponent,
    NoteFormComponent,
    WorkHourFormComponent,
    MachineryFormComponent,
    FuelFormComponent,
    FertilizerFormComponent,
    PesticideFormComponent,
    WaterFormComponent,

    ZoneDailyReportHarvestingComponent,
    HarvestingFormComponent,

    /* OKR */
    ZoneOKRComponent,
    OKRTableComponent,
    OKRFormComponent,
    OKRConfigureModalComponent,
    OKRRenameModalComponent
  ]
})
export class ZoneModule { }
