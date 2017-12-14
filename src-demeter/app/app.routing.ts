import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EmptyLayoutComponent } from './_shared/layout/layout/empty-layout.component';

export const routes: Routes = [{
  path: '',
  loadChildren: 'app/home/home.module#HomeModule'
}, {
  path: ':username',
  loadChildren: 'app/user/user.module#UserModule'
}, {
  path: '**', redirectTo: 'miscellaneous/error404',
}];

export const routing: ModuleWithProviders =
  // RouterModule.forRoot(routes, { useHash: true, enableTracing: true });
  RouterModule.forRoot(routes, { useHash: true });