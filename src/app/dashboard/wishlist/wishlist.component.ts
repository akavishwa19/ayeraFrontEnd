import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartTriggerService } from '../../services/cart-trigger.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  
  wishlistUrl:string=environment.baseurl+'/wishlist';
  cartUrl: string = environment.baseurl + '/cart';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  wishlist:any=[];

  constructor(private http:HttpClient,private triggerService:CartTriggerService,    private messageService: MessageService,){

  }

  ngOnInit(){
    this.fetchWishlist()
  }

  remove(id:string){
    this.http.delete(this.wishlistUrl+'/remove-from-wishlist?id='+id).subscribe((res:any)=>{
      this.fetchWishlist()
    })
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

  addToCart(productId:string,variantId:string) {
    console.log(productId,variantId)
    this.http
      .post(this.cartUrl, {
        productId: productId,
        variantId: variantId,
      })
      .subscribe(
        (res: any) => {
          this.sucess('Product added to cart');
          // this.triggerService.triggerHeaderGetCall()
          this.triggerService.get_cart_count();
        },
        (error) => {
          this.error(error.error.message);
        }
      );
  }

  fetchWishlist(){
    this.http.get(this.wishlistUrl+'/user-wishlist').subscribe((res:any)=>{
      this.wishlist=res.data;
    })
  }
}
