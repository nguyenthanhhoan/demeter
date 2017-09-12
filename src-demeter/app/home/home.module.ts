import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { routing } from './routing.module';
import { HomeComponent } from './home.component';
import { MobileRegisterComponent } from './mobile-register/mobile-register.component';
import { MobileSignInComponent } from './mobile-sign-in/mobile-sign-in.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    HomeComponent,
    MobileSignInComponent,
    MobileRegisterComponent]
})
export class HomeModule {
}
