/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {UserLayoutComponent} from './+user/shared/layout/user-layout/user-layout.component';
import {ModuleWithProviders} from "@angular/core";
import { AuthGuard } from './+auth/auth-guard.service';

import { DashboardComponent } from './+admin/+dashboard/dashboard.component';

import { ProjectFormComponent } from './+user/+project/form/project-form.component';
import { ProjectListComponent } from './+user/+project/list/project-list.component';
import { ZoneListComponent } from './+user/+zone/list/zone-list.component';
import { ZoneFormComponent } from './+user/+zone/form/zone-form.component';
import { ZoneSummaryComponent } from './+user/+zone/summary/zone-summary.component';
import { ZoneHistoryComponent } from './+user/+zone/history/zone-history.component';
import { ZoneCameraComponent } from './+user/+zone/camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './+user/+zone/camera/camera-detail/zone-camera-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'user', pathMatch: 'full'
            }
        ]
    },
    {
        path: 'admin',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
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
            }, {
                path: 'project/:id/zone/new',
                component: ZoneFormComponent 
            }, {
                path: 'project/:project_id/zone/:id',
                children: [{
                  path: 'summary', component: ZoneSummaryComponent 
                }, {
                  path: 'history', component: ZoneHistoryComponent 
                }, {
                  path: 'camera',
                  children: [{
                    path: '', component: ZoneCameraComponent 
                  }, {
                    path: ':camera_id', component: ZoneCameraDetailComponent 
                  }]
                }]
            }
        ],
        canActivate: [AuthGuard]
    },

    {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule'},

    {path: '**', redirectTo: 'miscellaneous/error404'}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
