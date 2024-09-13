import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrl: './product-card-cart.component.scss',
})
export class ProductCardCartComponent {
  cartUrl: string = environment.baseurl + '/cart';

  @Output() cartChange:EventEmitter<Object>=new EventEmitter<Object>()
  @Input() cardId: string = '';
  @Input() productImage: string = '';
  @Input() productName: string = '';
  @Input() productCode: string = '';
  @Input() weight: number = 0;
  @Input() strikedPrice: number = 0;
  @Input() price: number = 0;
  @Input() quantity: number = 0;
  @Input() variantId: Object;
  @Input() productId: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
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

  updateQty(action: string) {
    this.http
      .put(this.cartUrl + '/update?id=' + this.cardId, {
        variantId: this.variantId,
        action: action,
        productId: this.productId,
      })
      .subscribe((res: any) => {
        this.sucess('cart updates succesfully')
        this.cartChange.emit({change:'update'})
       
      },
    (error)=>{
      this.error(error.error.message)
    });
  }

  removeFromCart(){
    this.http.delete(this.cartUrl+'?id='+this.cardId).subscribe((res:any)=>{
      this.cartChange.emit({change:'product removed from cart'})
      this.sucess('product removed from cart')
    },(error)=>{
      this.error('some error occured')
    })
  }
}
