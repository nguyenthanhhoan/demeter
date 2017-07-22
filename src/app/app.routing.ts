import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layout/app-layouts/auth-layout.component';
import { AdminLayoutComponent } from './+admin/shared/layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './+user/shared/layout/user-layout/user-layout.component';
import {
    UserLayoutProjectListComponent
} from './+user/shared/layout/user-layout/user-layout-project-list.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './+auth/auth-guard.service';

import { ProjectFormComponent } from './+user/+project/form/project-form.component';
import { ProjectListComponent } from './+user/+project/list/project-list.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'user', pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        loadChildren: 'app/+admin/admin.module#AdminModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        children: [{
            path: '', redirectTo: 'project', pathMatch: 'full'
        }, {
            path: 'project',
            loadChildren:
                'app/+user/+project/project.module#ProjectModule',
        }],
        canActivate: [AuthGuard]
    },

    {
        path: 'auth', component: AuthLayoutComponent,
        loadChildren: 'app/+auth/auth.module#AuthModule'
    },

    {
        path: '**', redirectTo: 'miscellaneous/error404'
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true, enableTracing: true });