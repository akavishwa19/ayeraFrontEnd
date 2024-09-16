import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  
  wishlistUrl:string=environment.baseurl+'/wishlist'
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  wishlist:any=[];

  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.fetchWishlist()
  }

  fetchWishlist(){
    this.http.get(this.wishlistUrl+'/user-wishlist').subscribe((res:any)=>{
      this.wishlist=res.data;
    })
  }
}
