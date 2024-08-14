import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
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
import { SharedModule } from "../shared/shared.module";
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DashboardComponent,
    PersonalInfoComponent,
    CustomizableJewelleryComponent,
    OrdersComponent,
    WishlistComponent,
    ReviewsAndRatingsComponent,
    AddressesComponent,
    ResetPasswordComponent,
    AffiliatesComponent,
    BuyBackJewelComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    NgSelectModule,
]
})
export class DashboardModule { }
