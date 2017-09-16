import { NgModule } from '@angular/core';
import { routing } from './camera.routing';
import { SharedModule } from '../_shared/shared.module';
import { CameraComponent } from './camera.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    CameraComponent
  ]
})
export class CameraModule { }
