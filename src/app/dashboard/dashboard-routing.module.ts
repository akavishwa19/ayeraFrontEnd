import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CustomizableJewelleryComponent } from './customizable-jewellery/customizable-jewellery.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ReviewsAndRatingsComponent } from './reviews-and-ratings/reviews-and-ratings.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { BuyBackJewelComponent } from './buy-back-jewel/buy-back-jewel.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-information',
        pathMatch: 'full',
      },
      {
        path: 'personal-information',
        component: PersonalInfoComponent,
      },
      {
        path: 'customizable-jewellery',
        component: CustomizableJewelleryComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'reviews-and-ratings',
        component: ReviewsAndRatingsComponent,
      },
      {
        path: 'addresses',
        component: AddressesComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'affiliates',
        component: AffiliatesComponent,
      },
      {
        path: 'buy-back-jewels',
        component: BuyBackJewelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
