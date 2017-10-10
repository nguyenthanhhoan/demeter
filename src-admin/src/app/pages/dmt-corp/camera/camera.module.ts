import { NgModule } from '@angular/core';
import { SharedModule } from '../../../_shared/shared.module';
import { routing } from './camera.routing';
import { CameraListComponent } from './list/camera-list.component';
import { CameraFormComponent } from './form/camera-form.component';
import { CameraService } from './core/camera.service';


@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    CameraListComponent,
    CameraFormComponent,
  ],
  providers: [
    CameraService
  ],
})
export class CameraModule {

}
