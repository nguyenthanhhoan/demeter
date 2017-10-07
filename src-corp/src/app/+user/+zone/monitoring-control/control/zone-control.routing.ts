import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ZoneControlExecutionEditComponent
} from './execution-edit/zone-control-execution-edit.component';
import {
  ZoneControlExecutionNewComponent
} from './execution-new/zone-control-execution-new.component';
import { ZoneControlComponent } from './zone-control.component';

export const routes: Routes = [{
    path: '',
    component: ZoneControlComponent
  }, {
    path: 'executions/new',
    component: ZoneControlExecutionNewComponent
  }, {
    path: 'executions/:program_id',
    component: ZoneControlExecutionEditComponent
  }, {
    path: 'executions',
    component: ZoneControlComponent
  }
];

export const routing = RouterModule.forChild(routes);
