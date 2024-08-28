import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  productUrl = environment.baseurl + '/product';
  categoryUrl = environment.baseurl + '/categories';
  tagsUrl = environment.baseurl + '/tags';
  attributeUrl = environment.baseurl + '/attribute';
  patternUrl = environment.baseurl + '/pattern';
  productTypeUrl = environment.baseurl + '/productType';
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
  colorVariationsList: any = ([] = []);
  sizeVariationsList: any = ([] = []);
  productTypeList: any[] = [];
  patternList: any[] = [];
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;

  form:FormGroup=this.fb.group({
    childCategories:[null],
    tags:[null],
    colors:[null],
    sizes:[null],
    productType:[null],
    patterns:[null],
    sortBy:[null],
    sortOrder:[null],
    minPrice:[null],
    maxPrice:[null]
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder
  ) {
    this.passedSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.passedProductFetchType =
      this.activatedRoute.snapshot.paramMap.get('product-fetch-type');
  }

  ngOnInit(): void {
    this.fetchBasicRequirements(this.passedProductFetchType, this.passedSlug);
    this.getColorVariations();
    this.getSizeVariations();
    this.fetchPatternList();
    this.fetchProductTypeList();
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

  fetchPatternList() {
    this.http.get(this.patternUrl).subscribe((res: any) => {
      this.patternList = res.data;
    });
  }

  fetchProductTypeList() {
    this.http.get(this.productTypeUrl).subscribe((res: any) => {
      this.productTypeList = res.data;
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

  getColorVariations() {
    this.http
      .get(this.attributeUrl + '/color-variations')
      .subscribe((res: any) => {
        this.colorVariationsList = res.data;
      });
  }

  getSizeVariations() {
    this.http
      .get(this.attributeUrl + '/size-variations')
      .subscribe((res: any) => {
        this.sizeVariationsList = res.data;
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
    console.log(this.form.value)
    const element: HTMLElement = <HTMLElement>(
      document.getElementById('moreTagsSelector')
    );
    if (this.moreTags) {
      this.moreTags = false;
      element.innerHTML = `More    <i
      class="fa-solid fa-chevron-down padding-left-10px zero-padding-right"
    ></i>`;
    } else {
      this.moreTags = true;
      element.innerHTML = `Less    <i
          class="fa-solid fa-chevron-up padding-left-10px zero-padding-right"
        ></i>`;
    }
  }
}
