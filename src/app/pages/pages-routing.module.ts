import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { CartAddonsComponent } from './cart-addons/cart-addons.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'shop/:product-fetch-type/:slug',
        component: ShopComponent,
      },
      {
        path: 'product/:slug',
        component: ProductComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'cart-add-ons',
        component: CartAddonsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
