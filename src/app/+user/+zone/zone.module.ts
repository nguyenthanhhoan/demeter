import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from "../../shared/forms/validation/smartadmin-validation.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";

import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { BreadcrumbModule } from '../shared/layout/breadcrumb/breadcrumb.module';
import { IntegrationModule } from '../../shared/integration/integration.module';
import { CameraModule } from '../../shared/camera/camera.module';

import { ProjectSummaryModule } from '../shared/project-summary/project-summary.module';
import { ZoneSummaryPaneModule } from '../shared/zone-summary-pane/zone-summary-pane.module';
import { WeatherForecastModule } from '../shared/weather-forecast/weather-forecast.module';

import { ZoneFormComponent } from "../shared/zone-form/zone-form.component";
import { SensorDataChartComponent } from "../shared/sensor-data-chart/sensor-data-chart.component";

import { ZoneListComponent } from "./list/zone-list.component";
import { ZoneFormComponent as ZoneAddFormComponent } from "./form/zone-form.component";
import { ZoneSummaryComponent } from "./summary/zone-summary.component";
import { ZoneHistoryComponent } from "./history/zone-history.component";
import { ZoneCameraComponent } from "./camera/zone-camera.component";
import { ZoneCameraDetailComponent } from "./camera/camera-detail/zone-camera-detail.component";
import { ZoneWeatherComponent } from "./crop-management/weather/zone-weather.component";
import { ZoneSettingComponent } from "./setting/zone-setting.component";
import { ZoneSettingSummaryComponent } from "./setting/zone-setting-summary.component";
import { ZoneSettingCameraComponent } from "./setting/camera/zone-setting-camera.component";

/* Daily report */
import { ZoneDailyReportComponent } from "./crop-management/daily-report/zone-daily-report.component";
import { ZoneDailyReportOverviewComponent } from "./crop-management/daily-report/overview/zone-daily-report-overview.component";
import { IrrigationFormComponent } from "./crop-management/daily-report/overview/irrigation-form/irrigation-form.component";
import { PestDiseaseFormComponent } from "./crop-management/daily-report/overview/pest-disease-form/pest-disease-form.component";
import { ZoneDailyReportEnvironmentComponent } from "./crop-management/daily-report/environment/zone-daily-report-environment.component";
import { ZoneDailyReportUsageComponent } from "./crop-management/daily-report/usage/zone-daily-report-usage.component";
import { ZoneDailyReportHarvestingComponent } from "./crop-management/daily-report/harvesting/zone-daily-report-harvesting.component";

/* Zone OKR */
import { ZoneOKRComponent } from "./crop-management/okr/zone-okr.component";
import { OKRTableComponent } from "./crop-management/okr/okr-table/okr-table.component";
import { OKRFormComponent } from "./crop-management/okr/okr-form/okr-form.component";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    IntegrationModule,
    CameraModule,
    HeaderModule,
    SidebarModule,
    BreadcrumbModule,
    ProjectSummaryModule,
    ZoneSummaryPaneModule,
    WeatherForecastModule
  ],
  declarations: [
    ZoneFormComponent,
    SensorDataChartComponent,

    ZoneListComponent,
    ZoneAddFormComponent,
    ZoneSummaryComponent,
    ZoneHistoryComponent,
    ZoneCameraComponent,
    ZoneCameraDetailComponent,
    ZoneWeatherComponent,
    ZoneSettingComponent,
    ZoneSettingSummaryComponent,
    ZoneSettingCameraComponent,

    /* Daily report */
    ZoneDailyReportComponent,
    ZoneDailyReportOverviewComponent,
    ZoneDailyReportEnvironmentComponent,
    ZoneDailyReportUsageComponent,
    ZoneDailyReportHarvestingComponent,
    IrrigationFormComponent,
    PestDiseaseFormComponent,

    /* OKR */
    ZoneOKRComponent,
    OKRTableComponent,
    OKRFormComponent
  ]
})
export class ZoneModule { }
