import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as Pages from 'src/app/shared/components/pages';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: 'products', component: Pages.ProductsPageComponent },
  {
    path: 'product/add',
    component: Pages.ProductEditorPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'product/edit/:id',
    component: Pages.ProductEditorPageComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: Pages.LoginPageComponent },
  { path: 'register', component: Pages.RegisterPageComponent },
  { path: '', component: Pages.HomePageComponent },
  { path: '**', component: Pages.NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
