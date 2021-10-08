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
import { AppErrorHandler } from './core/errors';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRouterModule } from './core/routers/app-router.module';
import { AppAngularMaterialModule } from './core/materials/app-angular-mat.module';
import { ReactiveFormsModule } from '@angular/forms';

// components ///////////////////////////////////////////////////////////
import * as Components from './components';
import { AppStoreModule } from './core/ngrx/app-store.module';
import * as Services from './core/services';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { RefreshTokenAndRetryInterceptor } from './core/interceptors/refresh-token-and-retry.interceptor';

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

    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppStoreModule,
    AppRouterModule,
    AppAngularMaterialModule,
    MatMomentDateModule,
    JwtModule.forRoot({
      config: {
        // tokenGetter:  () => localStorage.getItem('access_token')
      }
    })
  ],
  providers: [
    // Services.StateStoreService,
    Services.CategoriesStoreService,
    Services.CategoryApiService,
    Services.ProductsStoreService,
    Services.ProductApiService,
    Services.SuppliersStoreService,
    Services.SupplierApiService,

    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenAndRetryInterceptor, multi: true },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
