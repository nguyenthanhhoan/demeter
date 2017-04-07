import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {HeaderModule} from "./header/header.module";
import {SidebarModule} from './sidebar/sidebar.module';
import {BreadcrumbModule} from './breadcrumb/breadcrumb.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserLayoutProjectListComponent } from './user-layout/user-layout-project-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    SidebarModule,
    BreadcrumbModule
  ],
  declarations: [
    UserLayoutComponent,
    UserLayoutProjectListComponent
  ],
  exports:[
    HeaderModule
  ]
})
export class UserLayoutModule{

}
