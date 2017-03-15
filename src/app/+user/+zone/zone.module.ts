import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "ng2-bootstrap";
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ChartistModule } from '../../shared/graphs/chartist/chartist.module';

import { HeaderModule } from '../shared/layout/header/header.module';

import { zoneRouting } from './zone.routing';
import { ZoneComponent } from "./zone.component";

@NgModule({
  imports: [
    CommonModule,
    zoneRouting,
    SmartadminModule,
    DropdownModule,
    ChartistModule,
    HeaderModule
  ],
  declarations: [ZoneComponent]
})
export class ZoneModule { }
