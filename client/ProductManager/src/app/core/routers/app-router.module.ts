import { RouterModule } from "@angular/router";
import * as Pages from '../../components/pages'

export const AppRouterModule = RouterModule.forRoot([
  { path: 'products', component: Pages.ProductsPageComponent },
  { path: '', component: Pages.HomePageComponent },
  { path: '**', component: Pages.NotFoundPageComponent}
])