import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MobileRegisterComponent } from './mobile-register/mobile-register.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'sign-up',
  component: MobileRegisterComponent
}];

export const routing = RouterModule.forChild(routes);
