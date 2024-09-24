import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import SwiperCore, {
  Navigation,
  Autoplay,
  Thumbs,
  Mousewheel,
  Pagination,
  SwiperOptions,
  Swiper,
} from 'swiper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { CartTriggerService } from '../../services/cart-trigger.service';

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs, Mousewheel]);

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartUrl:string=environment.baseurl+'/cart';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  private modalService = inject(NgbModal);
  RecommendedSwiperOptions: SwiperOptions = {
    spaceBetween: 4.2,
    initialSlide: 2,
    loop: true,

    pagination: true,
    mousewheel: false,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3.1,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 4.2,
        spaceBetween: 20,
      },
    },
  };
  cartCards: any[] = [
    {
      productId:{
        featuredImage:String,
        productCode:String,
        name:String,
        price:Number,
        weight:Number,
        sellingPrice:Number,
      },
      variantId:{
      
        name:String,
        price:Number,
        weight:Number,
        sellingPrice:Number,
        images:[]
      }
    }
  ];
  billDetails:any={};

  constructor(private http:HttpClient,  private messageService: MessageService,private location:Location,private triggerService:CartTriggerService){

  }

  ngOnInit(){
    this.fetchCart();
  }

  sucess(message) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  error(message) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  fetchCart(){
    this.http.get(this.cartUrl).subscribe((res:any)=>{
      this.triggerService.get_cart_count()
      this.cartCards=res.data;
      this.fetchBill();
    })
  }

  openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}

  updateCart(event:any){
    this.fetchCart()
    this.sucess(event.change)
  }

  fetchBill(){
    this.http.get(this.cartUrl+'/bill').subscribe((res:any)=>{
      this.billDetails=res.data;
    })
  }

  goBack(){
    this.location.back()
  }

  deleteCart(){
    this.http.delete(this.cartUrl+'/empty-cart').subscribe((res:any)=>{
      this.sucess('cart items removed succesfully');
      this.fetchCart()
    })
  }

}
