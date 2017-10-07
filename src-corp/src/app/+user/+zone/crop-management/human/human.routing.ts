import { Routes, RouterModule } from '@angular/router';
import { HumanComponent } from './human.component';

export const routes: Routes = [
  {
    path: '', component: HumanComponent
  }
];

export const routing = RouterModule.forChild(routes);
