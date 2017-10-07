import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from './header/header.module';
import { FooterComponent } from './footer/footer.component';
import { NavigationModule } from './navigation/navigation.module';
import { RibbonComponent } from './ribbon/ribbon.component';
import { ToggleActiveDirective } from '../utils/toggle-active.directive';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { TooltipModule, BsDropdownModule } from 'ng2-bootstrap';
import { RouteBreadcrumbsComponent  } from './ribbon/route-breadcrumbs.component';
import { UtilsModule } from '../../../shared/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    FormsModule,
    RouterModule,

    UtilsModule,

    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    RibbonComponent,
    AdminLayoutComponent,
    RouteBreadcrumbsComponent
  ],
  exports:[
    HeaderModule,
    NavigationModule,
    FooterComponent,
    RibbonComponent
  ]
})
export class AdminLayoutModule {

}
