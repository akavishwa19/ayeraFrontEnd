import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {SwiperModule} from "swiper/angular";
import { ShopComponent } from './shop/shop.component';
import {MatSliderModule} from "@angular/material/slider";
import { ProductComponent } from './product/product.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ShopComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NgbModalModule,
    SwiperModule,
    MatSliderModule,
    TabsModule,
    ProgressbarModule
  ]
})
export class PagesModule { }
