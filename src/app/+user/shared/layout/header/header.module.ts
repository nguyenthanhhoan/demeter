import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DropdownModule} from "ng2-bootstrap";

import {HeaderComponent} from "./header.component";

@NgModule({
  imports: [
    CommonModule,
    DropdownModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
