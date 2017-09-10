import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/*
* Platform and Environment providers/directives/pipes
*/
import { SharedModule } from './_shared/shared.module';
import { routing } from './app.routing';
// App is our top level component
import { AppComponent } from './app.component';

// Core providers
import { CoreModule } from './core/core.module';
import { userReducer } from './core/reducers/reducer';

import '../styles/main.scss';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpModule,

    CoreModule,
    A2tUiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    routing,
    StoreModule.provideStore({ user: userReducer })
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    Angular2TokenService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}