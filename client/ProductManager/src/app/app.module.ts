import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import * as Services from './core/services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppErrorHandler } from './core/errors';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRouterModule } from './core/routers/app-router.module';
import { AppAngularMaterialModule } from './core/materials/app-angular-mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

// components ///////////////////////////////////////////////////////////
import * as Components from './components';
import * as Pipes from './core/pipes';
import { AppStoreModule } from './core/ngrx/app-store.module';
import { RefreshTokenAndRetryInterceptor } from './core/interceptors/refresh-token-and-retry.interceptor';
import { APP_TOAST_CONFIG } from './core/utils/toastr.config';
import { SnakeGameComponent } from './components/common/snake-game/snake-game.component';

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
    AppRouterModule,
  ],
  providers: [
    // Services.StateStoreService,
    Services.CategoriesStoreService,
    Services.CategoryApiService,
    Services.ProductsStoreService,
    Services.ProductApiService,
    Services.SuppliersStoreService,
    Services.SupplierApiService,
    Services.LocalstorageTokensProviderService,

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
