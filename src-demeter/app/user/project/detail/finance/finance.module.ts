import { NgModule } from '@angular/core';
import { routing } from './finance.routing';
import { SharedModule } from '../_shared/shared.module';
import { FinanceComponent } from './finance.component';
import { FinanceTableComponent } from './finance-table/finance-table.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    FinanceComponent,
    FinanceTableComponent
  ]
})
export class FinanceModule { }
