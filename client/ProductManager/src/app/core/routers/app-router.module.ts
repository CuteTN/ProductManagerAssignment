import { RouterModule } from '@angular/router';
import * as Pages from '../../components/pages';
import { AuthGuardService } from '../services/guards/auth-guard.service';

export const AppRouterModule = RouterModule.forRoot([
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
]);
