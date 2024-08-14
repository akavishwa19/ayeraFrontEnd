import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrl: './product-card-cart.component.scss',
})
export class ProductCardCartComponent {
  @Input() productImage: string = '';
  @Input() productName: string = '';
  @Input() productCode: string = '';
  @Input() weight: number = 0;
  @Input() strikedPrice: number = 0;
  @Input() discount: number = 0;
  @Input() price: number = 0;

  quantity: number = 0;

  addQty() {
    this.quantity = this.quantity + 1;
  }

  reduceQty() {
    this.quantity = this.quantity - 1;
  }
}
