import { NgModule } from '@angular/core';
import { routing } from './setting.routing';
import { SharedModule } from '../_shared/shared.module';
import { SettingComponent } from './setting.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    SettingComponent
  ]
})
export class SettingModule { }
