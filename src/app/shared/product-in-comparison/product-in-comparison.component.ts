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
import { event } from 'jquery';

@Component({
  selector: 'app-product-in-comparison',
  templateUrl: './product-in-comparison.component.html',
  styleUrl: './product-in-comparison.component.scss',
})
export class ProductInComparisonComponent implements OnInit {
  categoryUrl = environment.baseurl + '/categories';
  tagUrl: string = environment.baseurl + '/tags';
  productUrl:string=environment.baseurl+'/product';
  imageUrl:string=environment.imageUrl;
  imageMetaUrl:string=environment.imageMetaUrl;

  @Input() productData: any = {
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
  activeProduct:{
    featuredImage:String,
    name:String,
    productCode:String,
    averageRating,
    price:Number,
    sellingPrice:Number,
    variants:[
      {
        images:[
          String

        ]
      }
   
    ]

  } | null=null

  @Output() productChange: EventEmitter<Object> = new EventEmitter<Object>();

  private modalService = inject(NgbModal);
  private modalRef: NgbModalRef;
  closeResult = '';
  count:number=0
  primaryCategoryList = [];
  secondaryCategoryList = [];
  tertiaryCategoryList = [];
  patternList:any[]=[];
  quaternaryCategoryList = [];
  tagList = [];
  searchTerm:string='';
  searchResponse:any[]=[];

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

  selectedProduct:any={

  }



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

  addType(item:any) {
    this.modalService.dismissAll();
    console.log(item)
    if(item.variants.length==0){
      this.activeProduct =item;
    }
    else{
      this.activeProduct=item.variants[0]
    }
    this.productData =item;
      this.productChange.emit(this.productData);
  }

  fetchBySearchTerm(){
    this.http.get(this.productUrl+'/by-search-term?searchTerm='+this.searchTerm).subscribe((res:any)=>{
      this.searchResponse=res.data.data;
      this.count=res.data.count;
    })
  }
}
