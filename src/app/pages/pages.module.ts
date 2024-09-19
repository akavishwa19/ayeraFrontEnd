import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import {NgbCollapseModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {SwiperModule} from "swiper/angular";
import { ShopComponent } from './shop/shop.component';
import {MatSliderModule} from "@angular/material/slider";
import { ProductComponent } from './product/product.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CartComponent } from './cart/cart.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import {  HttpClientModule } from '@angular/common/http';
import { CartAddonsComponent } from './cart-addons/cart-addons.component';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'primeng/fileupload';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ShopComponent,
    ProductComponent,
    CartComponent,
    ComingSoonComponent,
    CartAddonsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NgbModalModule,
    SwiperModule,
    MatSliderModule,
    TabsModule,
    ProgressbarModule,
    HttpClientModule,
    StepperModule,
    ButtonModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    NgSelectModule,
    FileUploadModule ,
    OverlayPanelModule,
    NgbCollapseModule ,
    MatPaginatorModule,
    NgbAccordionModule,
    NgbRatingModule,
    ToastModule,
    FormsModule
  ]
})
export class PagesModule { }
