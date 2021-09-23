import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './core/store/reducers';
import { ProductApiService } from './core/services';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './core/errors';
import { MatDatepickerModule } from '@angular/material/datepicker';

// components ///////////////////////////////////////////////////////////
import * as Components from './components';
import { AppRouterModule } from './core/routers/app-router.module';
import { AppAngularMaterialModule } from './core/materials/app-angular-mat.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Components.ProductsPageComponent,
    Components.HomePageComponent,
    Components.NotFoundPageComponent,
    Components.ProductEditorPageComponent,
    Components.ProductsTableComponent,
    Components.ProductEditorFormComponent,
    
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      products: productsReducer,
    }),
    AppRouterModule,
    AppAngularMaterialModule
  ],
  providers: [
    ProductApiService,
    { provide: ErrorHandler, useClass: AppErrorHandler},
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
