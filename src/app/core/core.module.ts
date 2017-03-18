import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsModule, ProgressbarModule, TooltipModule, DropdownModule, AlertModule} from "ng2-bootstrap";

import { IntegrationModule } from '../shared/integration/integration.module'
import { JsonApiService } from './api/json-api.service'
import { ApiService } from './api/api.service'
import { LayoutService } from '../shared/layout/layout.service'
import { NotificationService } from "../shared/utils/notification.service";
import { UserService } from '../shared/user/user.service'
import { VoiceControlService } from '../shared/voice-control/voice-control.service'
import { SoundService } from "../shared/sound/sound.service";

import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { VoiceRecognitionService } from "../shared/voice-control/voice-recognition.service";

import { ProjectService } from './services/project.service';
import { ZoneService } from './services/zone.service';

@NgModule({
  imports: [
    CommonModule,
    IntegrationModule,
    TooltipModule.forRoot(),
    DropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [],
  providers: [
    JsonApiService,
    ApiService,
    LayoutService,
    UserService,
    VoiceControlService,
    VoiceRecognitionService,
    SoundService,

    ProjectService,
    ZoneService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
