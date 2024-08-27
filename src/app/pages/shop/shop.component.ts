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
  categoryUrl = environment.baseurl + '/categories';
  tagsUrl = environment.baseurl + '/tags';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  filterBoolean: boolean = false;
  moreTags: boolean = false;
  private offcanvasService: NgbOffcanvas = inject(NgbOffcanvas);
  private modalService: NgbModal = inject(NgbModal);
  closeResult: string = '';
  productList: any[] = [];
  tagList: any[] = [];
  childCategoryList: any[] = [];
  passedProductFetchType: string = '';
  passedSlug: string = '';
  slugId: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.passedSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.passedProductFetchType =
      this.activatedRoute.snapshot.paramMap.get('product-fetch-type');
  }

  ngOnInit(): void {
    this.fetchBasicRequirements(this.passedProductFetchType, this.passedSlug);
  }

  fetchBasicRequirements(fetchType, slug) {
    this.http
      .get(
        this.productUrl +
          '/basic-fetch-requirements?type=' +
          fetchType +
          '&slug=' +
          slug
      )
      .subscribe((res: any) => {
        this.slugId = res.data._id;
        this.fetchChildCategories();
        this.fetchAllTags();
        this.getProducts();
      });
  }

  fetchChildCategories() {
    this.http
      .get(
        this.categoryUrl +
          '/child-categories?type=' +
          this.passedProductFetchType +
          '&categoryId=' +
          this.slugId
      )
      .subscribe((res: any) => {
        this.childCategoryList = res.data;
      });
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
    this.http
      .get(
        this.productUrl +
          '/products?type=' +
          this.passedProductFetchType +
          '&id=' +
          this.slugId
      )
      .subscribe((res: any) => {
        this.productList = res.data;
      });
  }

  detectValueLiked(event: any) {
    this.getProducts();
  }

  hoverClass(i) {
    let htmlCollection: HTMLCollection = <HTMLCollection>(
      document.getElementsByClassName('shopCategoryImageHolder')
    );
    let htmlCollectionText: HTMLCollection = <HTMLCollection>(
      document.getElementsByClassName('textClass')
    );

    for (let element of Array.from(htmlCollection)) {
      if (element instanceof HTMLElement) {
        element.style.border = 'none';
      }
    }

    for (let element of Array.from(htmlCollectionText)) {
      if (element instanceof HTMLElement) {
        element.style.color = '#020724';
        element.style.background = '#ffffff';
        element.classList.remove('mt-4');
        element.classList.remove('mirrorBody');
      }
    }

    const specialBorderElement: HTMLElement = document.getElementById(
      'border' + i
    );
    specialBorderElement.style.border = '15px solid #020724';

    const textBorder: HTMLElement = document.getElementById('textPad' + i);
    textBorder.style.background = '#020724';
    textBorder.style.color = '#ffffff';
    textBorder.style.borderRadius = '17px';
    textBorder.classList.add('mt-4');
    textBorder.classList.add('mirrorBody');
  }
  removeHoverClass(i) {
    const specialBorderElement: HTMLElement = document.getElementById(
      'border' + i
    );
    specialBorderElement.style.border = 'none';
    const textBorder: HTMLElement = document.getElementById('textPad' + i);
    textBorder.style.background = '#ffffff';
    textBorder.style.color = '#020724';
    textBorder.classList.remove('mt-4');
    textBorder.classList.remove('mirrorBody');
  }

  fetchAllTags() {
    this.http.get(this.tagsUrl).subscribe((res: any) => {
      this.tagList = res.data;
    });
  }

  markTag(id: string) {
    let singleTag = this.tagList.find((x) => x._id == id);

    if (singleTag?.ticked) {
      singleTag.ticked = false;
    } else {
      singleTag.ticked = true;
      this.filterBoolean = true;
    }
  }

  setMoreTags() {
    const element: HTMLElement = <HTMLElement>(
      document.getElementById('moreTagsSelector')
    );
    if(this.moreTags){
      this.moreTags=false;
      element.innerHTML = `More    <i
      class="fa-solid fa-chevron-down padding-left-10px zero-padding-right"
    ></i>`;
    }
    else{
    this.moreTags = true; 
    element.innerHTML = `Less    <i
          class="fa-solid fa-chevron-up padding-left-10px zero-padding-right"
        ></i>`;
      }
  }

  
}
