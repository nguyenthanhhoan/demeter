import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {PopoverModule} from "ng2-popover";

import {CollapseMenuComponent} from "./collapse-menu/collapse-menu.component";

import {HeaderComponent} from "./header.component";

import {UtilsModule} from "../../../../shared/utils/utils.module";
import {I18nModule} from "../../../../shared/i18n/i18n.module";
import {UserModule} from "../../../../shared/user/user.module";
import { BsDropdownModule } from "ng2-bootstrap";


@NgModule({
  imports: [
    CommonModule,

    FormsModule,

    BsDropdownModule,

    UtilsModule, I18nModule, UserModule, PopoverModule,
  ],
  declarations: [
    CollapseMenuComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
