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
    component: DTrackComponent,
    children: [{
      path: '', redirectTo: 'detail', pathMatch: 'full'
      }, {
        path: 'detail', component: BrandDetailComponent
      }
    ]
  }]
}];

export const routing = RouterModule.forChild(routes);
