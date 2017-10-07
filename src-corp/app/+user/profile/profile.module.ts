import { SharedModule } from '../_shared/shared.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {
}
