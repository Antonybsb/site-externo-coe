import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled', // Garante o comportamento do fragmento
        scrollPositionRestoration: 'enabled', // Volta ao topo ao mudar de página
      }),
    ),
  ],
};
