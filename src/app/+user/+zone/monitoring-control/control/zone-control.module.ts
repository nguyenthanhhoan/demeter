
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './zone-control.routing';
import { ChartJsModule } from '../../../../shared/graphs/chart-js/chart-js.module';
import { SmartadminModule } from '../../../../shared/smartadmin.module';
import { SmartadminInputModule } from '../../../../shared/forms/input/smartadmin-input.module';
import { ZoneControlComponent } from './zone-control.component';
import { DeviceAddModalComponent } from './_device-add-modal/device-add-modal.component';
import { ZoneControlDeviceComponent } from './device/zone-control-device.component';
import {
  ZoneControlExecutionComponent
} from './execution/zone-control-execution.component';
import {
  ZoneControlExecutionNewComponent
} from './execution-new/zone-control-execution-new.component';
import {
  ZoneControlExecutionEditComponent
} from './execution-edit/zone-control-execution-edit.component';
import {
  ZoneControlExecutionFormComponent
} from './_execution-form/zone-control-execution-form.component';
import { QueryBuilderModule } from '../../../../shared/query-builder/query-builder.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminInputModule,
    ChartJsModule,
    QueryBuilderModule,
    routing
  ],
  declarations: [
    ZoneControlComponent,
    DeviceAddModalComponent,
    ZoneControlDeviceComponent,
    ZoneControlExecutionComponent,
    ZoneControlExecutionNewComponent,
    ZoneControlExecutionFormComponent,
    ZoneControlExecutionEditComponent
  ],
  providers: [
  ]
})
export class ZoneControlModule {

}
