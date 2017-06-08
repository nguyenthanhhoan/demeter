import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TabsModule, ProgressbarModule, TooltipModule, BsDropdownModule, AlertModule
} from 'ng2-bootstrap';

import { IntegrationModule } from '../shared/integration/integration.module';
import { JsonApiService } from './api/json-api.service';
import { ApiService } from './api/api.service';
import { LayoutService } from '../shared/layout/layout.service';
import { NotificationService } from '../shared/utils/notification.service';
import { UserService } from '../shared/user/user.service';
import { VoiceControlService } from '../shared/voice-control/voice-control.service';
import { SoundService } from '../shared/sound/sound.service';

import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { VoiceRecognitionService } from '../shared/voice-control/voice-recognition.service';

import { CoreService } from './services/core.service';
import { ProjectService } from './services/project.service';
import { ZoneService } from './services/zone.service';
import { CameraService } from './services/camera.service';
import { SensorDataService } from './services/sensor-data.service';
import { DeviceFieldService } from './services/device-field-service';
import { MockDataService } from './services/mock-data.service';
import { WeatherService } from './services/weather.service';
import { OkrService } from './services/okr.service';
import { OkrObjectiveService } from './services/okr-objective.service';

@NgModule({
  imports: [
    CommonModule,
    IntegrationModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
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

    CoreService,
    ProjectService,
    ZoneService,
    CameraService,
    SensorDataService,
    DeviceFieldService,
    WeatherService,
    MockDataService,
    OkrService,
    OkrObjectiveService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
