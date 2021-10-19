import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

// components ///////////////////////////////////////////////////////////
import * as Components from './shared/components';
import * as Pipes from './shared/pipes';
import { AppStoreModule } from './modules/ngrx/app-store.module';
import { AppAngularMaterialModule } from './modules/materials/app-angular-mat.module';
import { RefreshTokenAndRetryInterceptor } from './shared/interceptors/refresh-token-and-retry.interceptor';
import { APP_TOAST_CONFIG } from './shared/utils/toastr.config';
import { AppErrorHandler } from './shared/errors';

@NgModule({
  declarations: [
    Components.ProductsPageComponent,
    Components.HomePageComponent,
    Components.NotFoundPageComponent,
    Components.ProductEditorPageComponent,
    Components.ProductsTableComponent,
    Components.ProductEditorFormComponent,
    Components.SelectStarRatingComponent,
    Components.MyDialogComponent,
    Components.ProductsFilterFormComponent,
    Components.LoginPageComponent,
    Components.RegisterPageComponent,
    Components.NavbarComponent,
    Components.SnakeGameComponent,

    Pipes.FlatPipe,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppStoreModule,
    AppAngularMaterialModule,
    MatMomentDateModule,
    JwtModule.forRoot({ config: {} }),
    ToastrModule.forRoot(APP_TOAST_CONFIG),
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenAndRetryInterceptor,
      multi: true,
    },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
