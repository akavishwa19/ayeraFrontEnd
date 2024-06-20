import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements  OnInit{
  featuredCategoryList:string[]=[];

  constructor() {
  }
  ngOnInit() {
    this.featuredCategoryList=['ALL JEWELLERY','EARRINGS','RINGS','NECKLACES','BRACELETES','GIFT BOXES','CUSTOM JEWELLERY']
  }
}
