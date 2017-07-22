import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import { CoreModule } from './core/core.module';
import { AdminLayoutModule } from './+admin/shared/layout/layout.module';
import { UserLayoutModule } from './+user/shared/layout/layout.module';
import { AuthGuard } from './+auth/auth-guard.service';
import { AuthService } from './+auth/auth.service';
import { zoneReducer } from './core/reducers/zone-reducer';
import { projectReducer } from './core/reducers/project-reducer';

// Application modules
import { UserModule } from './+user/user.module';

import '../styles/main.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthGuard,
  AuthService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    CoreModule,
    A2tUiModule,
    AdminLayoutModule,
    UserLayoutModule,
    routing,

    StoreModule.provideStore({ zone: zoneReducer, project: projectReducer }),

    UserModule
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    Angular2TokenService,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
}
