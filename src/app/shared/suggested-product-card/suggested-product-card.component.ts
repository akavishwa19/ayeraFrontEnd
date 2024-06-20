import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-suggested-product-card',
  templateUrl: './suggested-product-card.component.html',
  styleUrl: './suggested-product-card.component.scss'
})
export class SuggestedProductCardComponent {
  @Input() productImage:string='';
  @Input() productName:string='';
  @Input() productCode:string='';
  @Input() rating:number=0;
  @Input() strikedPrice:number=0;
  @Input() discount:number=0;
  @Input() price:number=0;


}
