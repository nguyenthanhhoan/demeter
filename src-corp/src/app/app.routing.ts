import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './+auth/auth-guard.service';
import { AuthLayoutComponent } from './shared/layout/app-layouts/auth-layout.component';

export const routes: Routes = [{
  path: '', redirectTo: 'user', pathMatch: 'full'
}, {
  path: 'admin',
  loadChildren: 'app/+admin/admin.module#AdminModule',
  canActivate: [AuthGuard]
}, {
  path: 'user',
  loadChildren: 'app/+user/user.module#UserModule',
  canActivate: [AuthGuard]
}, {
  path: '**', redirectTo: 'miscellaneous/error404',
}];

export const routing: ModuleWithProviders =
  RouterModule.forRoot(routes, { useHash: true, enableTracing: true });
