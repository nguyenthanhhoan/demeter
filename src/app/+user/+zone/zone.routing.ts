import { Routes, RouterModule } from '@angular/router';
import {ZoneComponent} from "./zone.component";
import {ModuleWithProviders} from "@angular/core";

export const zoneRoutes: Routes = [
    {
        path: '',
        component: ZoneComponent,
        data: {
            pageTitle: 'Zone'
        }
    }
];

export const zoneRouting: ModuleWithProviders = RouterModule.forChild(zoneRoutes);
