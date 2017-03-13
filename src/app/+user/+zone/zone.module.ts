import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from "../../shared/smartadmin.module";

import { zoneRouting } from './zone.routing';
import { ZoneComponent } from "./zone.component";

@NgModule({
  imports: [
    CommonModule,
    zoneRouting,
    SmartadminModule
  ],
  declarations: [ZoneComponent]
})
export class ZoneModule { }
