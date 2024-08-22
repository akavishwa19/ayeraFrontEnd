import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements  OnInit{

  categoryUrl:string=environment.baseurl+'/categories';

  featuredCategoryList:any[]=[];

  constructor(private http:HttpClient,private router:Router) {
  }
  ngOnInit() {
    this.fetchPrimaryCategories()
  }
  fetchPrimaryCategories(){
    this.http.get(this.categoryUrl+'/primary-category').subscribe((res:any)=>{
      this.featuredCategoryList=res.data
    })
  }

  routeToShop(slug:string){
    this.router.navigate(['/shop/primary/',slug])
  }


}
