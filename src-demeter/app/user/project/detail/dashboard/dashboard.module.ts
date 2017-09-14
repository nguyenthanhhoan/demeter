import { NgModule } from '@angular/core';
import { routing } from './dashboard.routing';
import { SharedModule } from '../_shared/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
