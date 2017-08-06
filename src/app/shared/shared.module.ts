import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';

import { SmartadminValidationModule } from './forms/validation/smartadmin-validation.module';
import { SmartadminModule } from './smartadmin.module';
import { SmartadminInputModule } from './forms/input/smartadmin-input.module';
import { NestableListModule } from './ui/nestable-list/nestable-list.module';

@NgModule({
    exports: [
        CommonModule,
        TranslateModule,
        SmartadminModule,
        SmartadminValidationModule,
        SmartadminInputModule,
        NestableListModule
    ]
})
export class SharedModule {}
