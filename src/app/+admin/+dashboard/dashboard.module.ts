import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
