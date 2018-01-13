import { Routes, RouterModule } from '@angular/router';
import { BrandDetailComponent } from './brand-detail.component';

export const routes: Routes = [
  {
    path: '', component: BrandDetailComponent
  }
];

export const routing = RouterModule.forChild(routes);
