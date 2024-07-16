import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import {ShopComponent} from "./shop/shop.component";
import {ProductCardComponent} from "../shared/product-card/product-card.component";
import {ProductComponent} from "./product/product.component";
import { CartComponent } from './cart/cart.component';

const routes: Routes = [{ path: '', component: PagesComponent,children:[
  {
    path:'',
    component:HomeComponent
  },
    {
      path:'shop',
      component:ShopComponent
    },
    {
      path:'product',
      component:ProductComponent
    },
    {
      path:'cart',
      component:CartComponent
    }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
