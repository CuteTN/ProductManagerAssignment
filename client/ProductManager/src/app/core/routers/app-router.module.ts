import { RouterModule } from "@angular/router";
import * as Pages from '../../components/pages'

export const AppRouterModule = RouterModule.forRoot([
  { path: 'products', component: Pages.ProductsPageComponent },
  { path: 'product/add', component: Pages.ProductEditorPageComponent},
  { path: 'product/edit/:id', component: Pages.ProductEditorPageComponent},
  { path: 'login', component: Pages.LoginPageComponent},
  { path: 'register', component: Pages.RegisterPageComponent},
  { path: '', component: Pages.HomePageComponent },
  { path: '**', component: Pages.NotFoundPageComponent}
])