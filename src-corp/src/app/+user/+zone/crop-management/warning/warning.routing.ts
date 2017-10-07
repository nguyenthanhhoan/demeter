import { Routes, RouterModule } from '@angular/router';
import { WarningComponent } from './warning.component';

export const routes: Routes = [
  {
    path: '', component: WarningComponent
  }
];

export const routing = RouterModule.forChild(routes);
