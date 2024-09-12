import {Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ComparedProductModel} from "../../Models/ComparedProduct.model";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product-in-comparison',
  templateUrl: './product-in-comparison.component.html',
  styleUrl: './product-in-comparison.component.scss'
})
export class ProductInComparisonComponent implements OnInit{


  @Input() productData: ComparedProductModel = {
    price: 0,
    color: '',
    size: '',
    weight: 0,
    length: 0,
    breadth: 0,
    stoneSize: '',
    discount: 0,
    image:'assets/images/cardImage.png',
    productCode:'',
    rating:0,
    name:'',
    strikedPrice:0
  };

  @Output() productChange:EventEmitter<Object>=new EventEmitter<Object>()

  private modalService = inject(NgbModal);
  private modalRef: NgbModalRef;
  closeResult = '';

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
    strikedPrice: 3999
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
    strikedPrice: 3999
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
    strikedPrice: 3999
  };

  ngOnInit() {

  }

  removeProduct(){

    this.productData.name='';
    this.productChange.emit(null)
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
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

  addType(num:number){
    this.modalService.dismissAll()
    if(num===0){
      this.productData=this.product1
      this.productChange.emit(this.product1)
    }
    else if(num===1){
      this.productData=this.product2
      this.productChange.emit(this.product2)
    }
    else{
      this.productData=this.product3
      this.productChange.emit(this.product3)
    }



  }


}
