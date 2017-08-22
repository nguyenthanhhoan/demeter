import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { routing } from './daily-task.routing';

import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    TaskListComponent
  ],
  providers: [
  ]
})
export class DailyTaskModule {

}
