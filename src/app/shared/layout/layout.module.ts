import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {HeaderModule} from "./header/header.module";
import {FooterComponent} from "./footer/footer.component";
import {RibbonComponent} from "./ribbon/ribbon.component";
import {ShortcutComponent} from "./shortcut/shortcut.component";
import {ToggleActiveDirective} from "../utils/toggle-active.directive";
import {LayoutSwitcherComponent} from "./layout-switcher.component";
import { EmptyLayoutComponent } from './app-layouts/empty-layout.component';
import {RouterModule} from "@angular/router";
import { AuthLayoutComponent } from './app-layouts/auth-layout.component';
import {TooltipModule, BsDropdownModule} from "ng2-bootstrap";
import { RouteBreadcrumbsComponent } from './ribbon/route-breadcrumbs.component';
import {UtilsModule} from "../utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    RouterModule,

    UtilsModule,


    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    RibbonComponent,
    ShortcutComponent,
    LayoutSwitcherComponent,
    EmptyLayoutComponent,
    AuthLayoutComponent,
    RouteBreadcrumbsComponent
  ],
  exports:[
    HeaderModule,
    FooterComponent,
    RibbonComponent,
    ShortcutComponent,
    LayoutSwitcherComponent,
  ]
})
export class SmartadminLayoutModule{

}
