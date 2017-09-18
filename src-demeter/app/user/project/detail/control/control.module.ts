import { NgModule } from '@angular/core';
import { routing } from './control.routing';
import { SharedModule } from '../_shared/shared.module';
import { ControlComponent } from './control.component';
import { TimerComponent } from './timer/timer.component';
import { EventComponent } from './event/event.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ControlComponent,
    TimerComponent,
    EventComponent
  ]
})
export class ControlModule { }
