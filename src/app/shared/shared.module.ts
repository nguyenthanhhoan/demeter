import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';

import { SmartadminValidationModule } from './forms/validation/smartadmin-validation.module';
import { SmartadminModule } from './smartadmin.module';
import { SmartadminInputModule } from './forms/input/smartadmin-input.module';
import { NestableListModule } from './ui/nestable-list/nestable-list.module';

import { CameraModule } from './camera/camera.module';
import { IntegrationModule } from './integration/integration.module';
import { ImageGalleryDirective } from './image-gallery/image-gallery.directive';

@NgModule({
    imports: [
        IntegrationModule,
        CameraModule
    ],
    declarations: [
        ImageGalleryDirective
    ],
    exports: [
        CommonModule,
        TranslateModule,
        SmartadminModule,
        SmartadminValidationModule,
        SmartadminInputModule,
        NestableListModule,
        IntegrationModule,
        CameraModule,
        ImageGalleryDirective
    ]
})
export class SharedModule {}
