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
  categoryFilterArray = [];
  tagFilterArray = [];
  colorFilterArray:any=[]
  colorVariationsList: any = ([] = []);
  sizeVariationsList: any = ([] = []);
  productTypeList: any[] = [];
  patternList: any[] = [];
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;

  form: FormGroup = this.fb.group({
    childCategories: [null],
    tags: [null],
    colors: [null],
    sizes: [null],
    productType: [null],
    patterns: [null],
    sortBy: [null],
    sortOrder: [null],
    minPrice: [0],
    maxPrice: [30000],
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.passedSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.passedProductFetchType =
      this.activatedRoute.snapshot.paramMap.get('product-fetch-type');

    this.activatedRoute.queryParams.subscribe((params) => {
      this.form.patchValue({
        childCategories: params['childCategories'],
      });
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.fetchBasicRequirements(this.passedProductFetchType, this.passedSlug);
    this.getColorVariations();
    this.getSizeVariations();
    this.fetchPatternList();
    this.fetchProductTypeList();
  }

  handleCheckBoxChangeForChildCategories(event: any, index, id) {
    this.hoverClass(index, id);
  }

  handleColorCheckbox(event:any,id:string){
    const singleColor=this.colorVariationsList.find((x)=>x._id==id)
    if(event.target.checked){
      this.colorFilterArray.push(id)
      this.colorVariationsList
    }
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

  hoverClass(i, index) {
    const findElement = this.childCategoryList.find((x) => x._id == index);

    if (findElement.checked == true) {
      const specialBorderElement: HTMLElement = document.getElementById(
        'border' + i
      );
      specialBorderElement.style.border = 'none';

      const textBorder: HTMLElement = document.getElementById('textPad' + i);
      textBorder.style.background = '#ffffff';
      textBorder.style.color = '#020724';
      textBorder.style.borderRadius = '17px';
      textBorder.classList.remove('mt-4');
      textBorder.classList.remove('mirrorBody');
      findElement.checked = false;

      this.categoryFilterArray = this.categoryFilterArray.filter(
        (x) => x != index
      );
    } else {
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
      findElement.checked = true;

      this.categoryFilterArray.push(index);
    }

    this.form.patchValue({ childCategories: this.categoryFilterArray });
    console.log(this.form.value.childCategories);

    // this.applyFilters()
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
      // this.tagList = this.tagList.map((x) => {
      //   return {
      //     ...x,
      //     ticked: false,
      //   };
      // });
    });
  }

  markTag(id: string) {
    let singleTag = this.tagList.find((x) => x._id == id);

    if (singleTag?.ticked == true) {
      this.tagFilterArray = this.tagFilterArray.filter((x) => x != id);
      singleTag.ticked = false;
    } else {
      this.tagFilterArray.push(id);
      singleTag.ticked = true;
    }

    this.form.patchValue({
      tags: this.tagFilterArray,
    });
  }

  setMoreTags() {

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

  applyFilters() {

    console.log(this.form.value)

    // const queryParams = {
    //   childCategories: this.form.get('childCategories')?.value || null,
    // };

    // Object.keys(queryParams).forEach(
    //   (key) => queryParams[key] === null && delete queryParams[key]
    // );

    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: queryParams,
    //   queryParamsHandling: 'merge',
    // });
  }
}
