import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartJsModule } from '../../../shared/graphs/chart-js/chart-js.module';
import { SmartadminModule } from '../../../shared/smartadmin.module';
import { ZoneControlComponent } from '../monitoring-control/control/zone-control.component';
import { DeviceAddModalComponent } from './control/_device-add-modal/device-add-modal.component';
import { ZoneControlDeviceComponent } from './control/device/zone-control-device.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    ChartJsModule
  ],
  declarations: [
    ZoneControlComponent,
    DeviceAddModalComponent,
    ZoneControlDeviceComponent,
  ],
  providers: [
  ]
})
export class MonitoringControlModule {

}
