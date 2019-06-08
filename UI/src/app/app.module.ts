import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { HeroCardComponent } from './shared/components/hero-card/hero-card.component';
import { RoutesModule } from './routes.module';
import { BrowserModule } from '@angular/platform-browser';
import { HeroesState } from './store/heroes.state';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    NgxsFormPluginModule.forRoot(),
    NgxsModule.forRoot([HeroesState]),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient],
      },
      isolate: true,
    }),
    RoutesModule
  ],
  providers: [],
  exports: [
    HeroCardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
