import { NgModule } from '@angular/core';
import { routing } from './alert.routing';
import { SharedModule } from '../_shared/shared.module';
import { AlertComponent } from './alert.component';
import { RuleComponent } from './rule/rule.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    AlertComponent,
    RuleComponent
  ]
})
export class AlertModule { }
