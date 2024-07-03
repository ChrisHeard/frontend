import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/app.reducers';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { MarketsEffects } from './store/effects/markets.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [

    importProvidersFrom(
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([MarketsEffects]),
    ),
 
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()), provideAnimationsAsync()
    
  ]
};
