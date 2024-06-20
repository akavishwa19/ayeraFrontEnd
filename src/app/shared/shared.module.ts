import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { AdvertisementHeaderComponent } from './advertisement-header/advertisement-header.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {NgbModalModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import { SuggestedProductCardComponent } from './suggested-product-card/suggested-product-card.component';
import { CompareProductComponent } from './compare-product/compare-product.component';
import { ProductInComparisonComponent } from './product-in-comparison/product-in-comparison.component';


@NgModule({
  declarations: [
    SharedComponent,
    AdvertisementHeaderComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    SuggestedProductCardComponent,
    CompareProductComponent,
    ProductInComparisonComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    InputSwitchModule,
    FormsModule,
    NgbModalModule,
    NgbRatingModule
  ],
    exports: [
        AdvertisementHeaderComponent,
        HeaderComponent,
        FooterComponent,
        ProductCardComponent,
        SuggestedProductCardComponent,
        CompareProductComponent
    ]
})
export class SharedModule { }
