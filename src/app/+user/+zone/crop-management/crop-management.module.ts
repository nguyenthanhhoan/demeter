import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { routing } from './crop-management.routing';
import { OKRFormComponent } from './okr/okr-form/okr-form.component';
import { ZoneOKRComponent } from './okr/zone-okr.component';
import { ZoneWeatherComponent } from './weather/zone-weather.component';
import { OKRTableComponent } from './okr/okr-table/okr-table.component';
import { OKRRenameModalComponent } from './okr/_okr-rename-modal/okr-rename-modal.component';
import {
  OKRConfigureModalComponent
} from './okr/_okr-configure-modal/okr-configure-modal.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    OKRFormComponent,
    ZoneOKRComponent,
    ZoneWeatherComponent,
    OKRTableComponent,
    OKRFormComponent,
    OKRConfigureModalComponent,
    OKRRenameModalComponent,
    ZoneWeatherComponent
  ],
  providers: [
  ]
})
export class CropManagementModule {

}
