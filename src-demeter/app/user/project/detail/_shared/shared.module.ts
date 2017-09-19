import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as ProjectSharedModule } from '../../_shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { CameraModule } from './camera/camera.module';
import { SensorDataChartComponent } from './sensor-data-chart/sensor-data-chart.component';

@NgModule({
  imports: [
    ProjectSharedModule,
    CameraModule
  ],
  declarations: [
    LayoutComponent,
    SensorDataChartComponent
  ],
  exports: [
    ProjectSharedModule,
    LayoutComponent,
    SensorDataChartComponent,
    CameraModule
  ]
})
export class SharedModule {
}
