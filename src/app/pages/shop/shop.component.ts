import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  productUrl = environment.baseurl + '/product';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  private offcanvasService: NgbOffcanvas = inject(NgbOffcanvas);
  private modalService: NgbModal = inject(NgbModal);
  closeResult: string = '';
  productList: any[] = [];
  passedProductFetchType:string='';
  passedSlug:string='';
  slugId:string='';

  constructor(private http: HttpClient,private router:Router,private activatedRoute:ActivatedRoute) {
    this.passedSlug=this.activatedRoute.snapshot.paramMap.get('slug')
    this.passedProductFetchType=this.activatedRoute.snapshot.paramMap.get('product-fetch-type')   
  }

  ngOnInit(): void {
    this.fetchBasicRequirements(this.passedProductFetchType,this.passedSlug)

  }

  fetchBasicRequirements(fetchType,slug){
    this.http.get(this.productUrl+'/basic-fetch-requirements?type='+fetchType+'&slug='+slug).subscribe((res:any)=>{
      this.slugId=res.data._id;
      this.getProducts();
    })
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, {
        ariaLabelledBy: 'offcanvas-basic-title',
        position: 'end',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  getProducts() {
    this.http.get(this.productUrl + '/products?type='+this.passedProductFetchType+'&id='+this.slugId).subscribe((res: any) => {
      this.productList = res.data;
    });
  }

  detectValueLiked(event:any){
    this.getProducts()
  }

}
