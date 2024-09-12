import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { gsap } from 'gsap/gsap-core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements  OnInit{

  categoryUrl:string=environment.baseurl+'/categories';

  featuredCategoryList:any[]=[];
  secondaryCategoryList:any[]=[];
  tertiaryCategoryList:any[]=[];
  closePanelBoolean:boolean=false;

  constructor(private http:HttpClient,private router:Router) {
  }
  ngOnInit() {

    this.fetchPrimaryCategories()
    if(this.router.url=='/'){
      this.headerLogoAnimation()
    }
  }
  headerLogoAnimation() {
    gsap.fromTo(
      '.aayraHeaderLogoHolder',
      {
        y: 80,
      },
      {
        y: 0,
        scrollTrigger: {
          toggleActions: 'restart restart none none',
          scrub: 2,
          start: 'top top',
          end: 'bottom top',
        },   
        duration:0.3,
        immediateRender:false
      }
    );
  }
  fetchPrimaryCategories(){
    this.http.get(this.categoryUrl+'/primary-category').subscribe((res:any)=>{
      this.featuredCategoryList=res.data
    })
  }

  routeToShop(slug:string){
    this.router.navigate(['/shop/primary/',slug])
  }

  fetchByPrimary(id:string){
    this.http.get(this.categoryUrl+'/secondary-category?id='+id).subscribe((res:any)=>{
      this.secondaryCategoryList=res.data;
      this.closePanelBoolean=true;
    })
  }

  fetchBySecondary(id:string){
    this.http.get(this.categoryUrl+'/tertiary-category?id='+id).subscribe((res:any)=>{
      this.tertiaryCategoryList=res.data
    })
  }


}
