import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { routing } from './zone-daily-report.routing';

import { ZoneDailyReportComponent } from './zone-daily-report.component';

import { ZoneDailyReportEnvironmentComponent } from './environment/zone-daily-report-environment.component';

import { HarvestingFormComponent } from './harvesting/harvesting-form/harvesting-form.component';
import { ZoneDailyReportHarvestingComponent } from './harvesting/zone-daily-report-harvesting.component';

import { NoteFormComponent } from './overview/note-form/note-form.component';
import { ImageReportFormComponent } from './overview/image-report-form/image-report-form.component';
import { PestDiseaseFormComponent } from './overview/pest-disease-form/pest-disease-form.component';
import { IrrigationFormComponent } from './overview/irrigation-form/irrigation-form.component';
import { ZoneDailyReportOverviewComponent } from './overview/zone-daily-report-overview.component';

import { WaterFormComponent } from './usage/water/water-form.component';
import { PesticideFormComponent } from './usage/pesticide/pesticide-form.component';
import { FertilizerFormComponent } from './usage/fertilizer-form/fertilizer-form.component';
import { FuelFormComponent } from './usage/fuel-form/fuel-form.component';
import { MachineryFormComponent } from './usage/machinery-form/machinery-form.component';
import { WorkHourFormComponent } from './usage/work-hour-form/work-hour-form.component';
import { ZoneDailyReportUsageComponent } from './usage/zone-daily-report-usage.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ZoneDailyReportComponent,
    ZoneDailyReportEnvironmentComponent,

    ZoneDailyReportHarvestingComponent,
    HarvestingFormComponent,

    ZoneDailyReportOverviewComponent,
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
  ],
  providers: [
  ]
})
export class ZoneDailyReportModule {

}
