import {Component, EventEmitter, OnInit} from '@angular/core';
import {ComparedProductModel} from "../../Models/ComparedProduct.model";

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrl: './compare-product.component.scss'
})
export class CompareProductComponent implements OnInit{

  renderedArray:ComparedProductModel[]=[];



  ngOnInit() {
    // this.renderedArray[1]={
    //   price:0,
    //   color:'red',
    //   size:'red',
    //   stoneSize:'red',
    //   weight:0,
    //   length:0,
    //   breadth:0,
    //   discount:0,
    //   image:'',
    //   productCode:'',
    //   rating:0,
    //   name:'',
    //   strikedPrice:0
    // }

  }

  handleChange(event:any,index:number){
      this.renderedArray[index]=event
  }
}
