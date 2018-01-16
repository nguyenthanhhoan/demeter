import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from './_shared/layout/user-layout/user-layout.component';
import { DTrackComponent } from './d-track.component';
import { BrandNewComponent } from './brand-new/brand-new.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutComponent,
  children: [{
    path: '',
    component: BrandListComponent,
  }, {
      path: 'new',
      component: BrandNewComponent
  }, {
    path: ':id',
    children: [{
        path: 'detail',
        loadChildren: 'app/+user/d-track/brand-detail/brand-detail.module#BrandDetailModule'
      },
      {
        path: 'products',
        loadChildren: 'app/+user/d-track/product/product.module#ProductModule'
      }
    ]
  }]
}];

export const routing = RouterModule.forChild(routes);
