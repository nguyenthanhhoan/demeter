/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {AdminLayoutComponent} from "./+admin/shared/layout/admin-layout/admin-layout.component";
import {UserLayoutComponent} from './+user/shared/layout/user-layout/user-layout.component';
import {UserLayoutProjectListComponent} from './+user/shared/layout/user-layout/user-layout-project-list.component';
import {ModuleWithProviders} from "@angular/core";
import { AuthGuard } from './+auth/auth-guard.service';

import { ProjectFormComponent } from './+user/+project/form/project-form.component';
import { ProjectListComponent } from './+user/+project/list/project-list.component';
import { ZoneListComponent } from './+user/+zone/list/zone-list.component';
import { ZoneFormComponent } from './+user/+zone/form/zone-form.component';
import { ZoneSummaryComponent } from './+user/+zone/summary/zone-summary.component';
import { ZoneHistoryComponent } from './+user/+zone/history/zone-history.component';
import { ZoneCameraComponent } from './+user/+zone/camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './+user/+zone/camera/camera-detail/zone-camera-detail.component';

import { ZoneOKRComponent } from './+user/+zone/crop-management/okr/zone-okr.component';
import { OKRFormComponent } from './+user/+zone/crop-management/okr/okr-form/okr-form.component';
import { ZoneWeatherComponent } from './+user/+zone/crop-management/weather/zone-weather.component';
import { ZoneDailyReportComponent } from './+user/+zone/crop-management/daily-report/zone-daily-report.component';

import { ZoneSettingComponent } from './+user/+zone/setting/zone-setting.component';

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
        children: [
            {
                path: '', redirectTo: 'project', pathMatch: 'full'
            }, {
                path: 'project',
                component: UserLayoutProjectListComponent,
                children: [{
                    path: '',
                    component: ProjectListComponent
                }, {
                    path: 'new', component: ProjectFormComponent 
                }]
            }, {
                path: 'project',
                component: UserLayoutComponent,
                children: [{
                    path: ':id',
                    component: ZoneListComponent
                }, {
                    path: ':id/zone/new',
                    component: ZoneFormComponent 
                }, {
                    path: ':project_id/zone/:id',
                    children: [{
                            path: '', redirectTo: 'summary', pathMatch: 'full'
                        }, {
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
                        }, {
                            path: 'weather', component: ZoneWeatherComponent
                        }, {
                            path: 'setting', component: ZoneSettingComponent
                        }, {
                            path: 'daily-report', component: ZoneDailyReportComponent
                        }, {
                            path: 'okr', 
                            children: [{
                                path: '', component: ZoneOKRComponent,
                            }, {
                                path: ':objective_id', component: OKRFormComponent 
                            }]
                        }]
                }]
        }],
        canActivate: [AuthGuard]
    },

    {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule'},

    {path: '**', redirectTo: 'miscellaneous/error404'}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
