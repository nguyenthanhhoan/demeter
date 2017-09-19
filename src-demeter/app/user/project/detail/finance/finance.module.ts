import { NgModule } from '@angular/core';
import { routing } from './finance.routing';
import { SharedModule } from '../_shared/shared.module';
import { FinanceComponent } from './finance.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    FinanceComponent
  ]
})
export class FinanceModule { }
