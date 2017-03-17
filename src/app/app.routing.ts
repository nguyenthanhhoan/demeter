/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {UserLayoutComponent} from './shared/layout/app-layouts/user-layout.component';
import {ModuleWithProviders} from "@angular/core";
import { AuthGuard } from './+auth/auth-guard.service';

import { ProjectFormComponent } from './+user/+project/form/project-form.component';
import { ProjectListComponent } from './+user/+project/list/project-list.component';
import { ZoneListComponent } from './+user/+zone/list/zone-list.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/+home/home.module#HomeModule'
            },
        ],
        canActivate: [AuthGuard]
    },

    {
        path: 'user',
        component: UserLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'project', pathMatch: 'full'
            }, {
                path: 'project',
                component: ProjectListComponent 
            }, { 
                path: 'project/new', component: ProjectFormComponent 
            }, {
                path: 'project/:id',
                component: ZoneListComponent 
            }
        ]
    },

    {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule'},

    {path: '**', redirectTo: 'miscellaneous/error404'}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
