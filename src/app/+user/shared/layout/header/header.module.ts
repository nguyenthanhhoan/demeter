import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BsDropdownModule} from "ng2-bootstrap";

import {HeaderComponent} from "./header.component";

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
