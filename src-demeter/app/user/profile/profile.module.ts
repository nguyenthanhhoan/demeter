import { NgModule } from '@angular/core';
import { routing } from './profile.routing';
import { SharedModule } from '../../_shared/shared.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
