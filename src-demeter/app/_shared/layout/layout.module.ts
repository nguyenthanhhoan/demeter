import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyLayoutComponent } from './layout/empty-layout.component';
import { UserLayoutComponent } from './layout/user-layout.component';
import { HeaderComponent } from './header/header.component';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './notification/notification.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClickOutsideModule
  ],
  declarations: [
    HeaderComponent,
    EmptyLayoutComponent,
    UserLayoutComponent,
    SettingComponent,
    NotificationComponent
  ],
  exports: [
  ]
})
export class LayoutModule { }
