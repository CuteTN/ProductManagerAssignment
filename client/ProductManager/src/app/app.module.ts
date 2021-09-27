import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './core/errors';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRouterModule } from './core/routers/app-router.module';
import { AppAngularMaterialModule } from './core/materials/app-angular-mat.module';
import { ReactiveFormsModule } from '@angular/forms';

// components ///////////////////////////////////////////////////////////
import * as Components from './components';
import * as Services from './core/services';
import { AppStoreModule } from './core/ngrx/app-store.module';

@NgModule({
  declarations: [
    Components.ProductsPageComponent,
    Components.HomePageComponent,
    Components.NotFoundPageComponent,
    Components.ProductEditorPageComponent,
    Components.ProductsTableComponent,
    Components.ProductEditorFormComponent,
    Components.SelectStarRatingComponent,
    
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
    AppAngularMaterialModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
