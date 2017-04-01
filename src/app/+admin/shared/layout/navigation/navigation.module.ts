

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserModule} from "../../../../shared/user/user.module";
import {I18nModule} from "../../../../shared/i18n/i18n.module";
import {BigBreadcrumbsComponent} from "./big-breadcrumbs.component";
import {MinifyMenuComponent} from "./minify-menu.component";
import {NavigationComponent} from "./navigation.component";
import {SmartMenuDirective} from "./smart-menu.directive";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UserModule
  ],
  declarations: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    SmartMenuDirective,
  ],
  exports: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    SmartMenuDirective,
  ]
})
export class NavigationModule{}
