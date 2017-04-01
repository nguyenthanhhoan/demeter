import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from "../../shared/smartadmin.module";

import { DashboardComponent} from "./dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
