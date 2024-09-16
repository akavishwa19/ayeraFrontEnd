import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ComparedProductModel } from '../../Models/ComparedProduct.model';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-in-comparison',
  templateUrl: './product-in-comparison.component.html',
  styleUrl: './product-in-comparison.component.scss',
})
export class ProductInComparisonComponent implements OnInit {
  categoryUrl = environment.baseurl + '/categories';
  tagUrl: string = environment.baseurl + '/tags';

  @Input() productData: ComparedProductModel = {
    price: 0,
    color: '',
    size: '',
    weight: 0,
    length: 0,
    breadth: 0,
    stoneSize: '',
    discount: 0,
    image: 'assets/images/cardImage.png',
    productCode: '',
    rating: 0,
    name: '',
    strikedPrice: 0,
  };

  @Output() productChange: EventEmitter<Object> = new EventEmitter<Object>();

  private modalService = inject(NgbModal);
  private modalRef: NgbModalRef;
  closeResult = '';
  primaryCategoryList = [];
  secondaryCategoryList = [];
  tertiaryCategoryList = [];
  patternList:any[]=[];
  quaternaryCategoryList = [];
  tagList = [];

  product1: ComparedProductModel = {
    price: 2999,
    color: 'Red',
    size: 'L',
    weight: 200,
    length: 30,
    breadth: 20,
    stoneSize: 'Medium',
    discount: 10,
    image: 'assets/images/cardImage.png',
    productCode: 'P12345',
    rating: 4,
    name: 'Sample Product',
    strikedPrice: 3999,
  };

  product2: ComparedProductModel = {
    price: 5999,
    color: 'Red',
    size: 'L',
    weight: 200,
    length: 30,
    breadth: 20,
    stoneSize: 'Medium',
    discount: 10,
    image: 'assets/images/cardImage.png',
    productCode: 'P12345',
    rating: 4,
    name: 'Sample Product2',
    strikedPrice: 3999,
  };

  product3: ComparedProductModel = {
    price: 5999,
    color: 'Red',
    size: 'L',
    weight: 200,
    length: 30,
    breadth: 20,
    stoneSize: 'Medium',
    discount: 10,
    image: 'assets/images/cardImage.png',
    productCode: 'P12345',
    rating: 4,
    name: 'Sample Product3',
    strikedPrice: 3999,
  };

  form:FormGroup=this.fb.group({
    primary:new FormControl([]),
    secondary:new FormControl([]),
    tertiary:new FormControl([]),
    quaternary:new FormControl([]),
    tags:new FormControl([]),
    productCode:new FormControl([]),
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit() {
  
  }

  removeProduct() {
    this.productData.name = '';
    this.productChange.emit(null);
  }

  open(content: TemplateRef<any>) {

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  addType(num: number) {
    this.modalService.dismissAll();
    if (num === 0) {
      this.productData = this.product1;
      this.productChange.emit(this.product1);
    } else if (num === 1) {
      this.productData = this.product2;
      this.productChange.emit(this.product2);
    } else {
      this.productData = this.product3;
      this.productChange.emit(this.product3);
    }
  }

  // getPrimaryCategories() {
  //   this.http
  //     .get(this.categoryUrl + '/primary-category')
  //     .subscribe((res: any) => {
  //       this.primaryCategoryList = res.data;
  //     });
  // }

  // getSecondaryCategories() {
  //   console.log(this.form.value);
  //   this.http
  //     .get(
  //       this.categoryUrl +
  //         '/secondary-category?id=' +
  //         this.form.controls['primary'].value
  //     )
  //     .subscribe((res: any) => {
  //       this.secondaryCategoryList = res.data;
  //     });
  // }

  // getTertiaryCategories() {
  //   this.http
  //     .get(
  //       this.categoryUrl +
  //         '/tertiary-category?id=' +
  //         this.form.controls['secondary'].value
  //     )
  //     .subscribe((res: any) => {
  //       this.tertiaryCategoryList = res.data;
  //     });
  // }

  // getQuaternaryCategories() {
  //   this.http
  //     .get(
  //       this.categoryUrl +
  //         '/quaternary-category?id=' +
  //         this.form.controls['tertiary'].value
  //     )
  //     .subscribe((res: any) => {
  //       this.quaternaryCategoryList = res.data;
  //     });
  // }

  // getTags() {
  //   this.http.get(this.tagUrl).subscribe((res: any) => {
  //     this.tagList = res.data;
  //   });
  // }
}
