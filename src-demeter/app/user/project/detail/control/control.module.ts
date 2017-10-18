import { NgModule } from '@angular/core';
import { routing } from './control.routing';
import { SharedModule } from '../_shared/shared.module';
import { ControlComponent } from './control.component';
import { TimerComponent } from './timer/timer.component';
import { EventComponent } from './event/event.component';
import { EventRuleComponent } from './event/event-rule/event-rule.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ControlComponent,
    TimerComponent,
    EventComponent,
    EventRuleComponent
  ]
})
export class ControlModule { }
