import { NgModule } from '@angular/core';
import { routing } from './camera.routing';
import { SharedModule } from '../_shared/shared.module';
import { CameraComponent } from './camera.component';
import { CameraModalComponent } from './camera-modal/camera-modal.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    CameraComponent,
    CameraModalComponent
  ]
})
export class CameraModule { }
