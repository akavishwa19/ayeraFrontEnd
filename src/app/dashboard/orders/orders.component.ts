import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  ordersUrl=environment.baseurl+'/orders';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  ordersList:any=[];

  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.fetchOrders()
  }

  fetchOrders(){
    this.http.get(this.ordersUrl).subscribe((res:any)=>{
      this.ordersList=res.data;
    })
  }

}
