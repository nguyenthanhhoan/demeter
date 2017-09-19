import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';

export const routes: Routes = [{
  path: '',
  component: SettingComponent
}];

export const routing = RouterModule.forChild(routes);
