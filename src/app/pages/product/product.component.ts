import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SwiperCore, {
  Navigation,
  Autoplay,
  Thumbs,
  Mousewheel,
  Pagination, SwiperOptions,
  Swiper
} from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay,
  Thumbs,
  Mousewheel
]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  @ViewChild('verticalSwiperRef') swiperRef:ElementRef;

  swiperArray: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  sizeArray:any[]=[
    {
      value:'20.7'
    },
    {
      value:'21'
    },
    {
      value:'21.6'
    },
    {
      value:'22'
    },
  ]

  colorArray: any[] = [
    { name: 'Gold', value: '#ECC15D' },
    { name: 'Rose', value: '#BF7D7B' },
    { name: 'Brass', value: '#DDC69A' },
    { name: 'Silver', value: '#B1B1B1' },
    { name: 'Oxidised', value: '#858585' }
  ];

  productTabs:any[]=[
    {
      name:'Product Description'
    },
    {
      name:'Jewellery Care'
    },
    {
      name:'Jewellery Disclaimer'
    },
    {
      name:'Shipping Information'
    },
    {
      name:'FAQ’s'
    },
  ]

  selectedSize: string = '20.7';
  selectedColor: string = '#FF0000';
  expectedDeliveryDate:Date=new Date();

  verticalSwiperOptions: SwiperOptions = {
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 50,
    loop: true,
    mousewheel: true,
    grabCursor: true,
  };

  previewedSwiperOptions: SwiperOptions = {
    spaceBetween: 1,
    initialSlide: 2,
    loop: true,
    centeredSlides: true,
    pagination: true,
    mousewheel: false,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };

  constructor() {
  }

  ngOnInit() {
    this.selectedSize='20.7';
    this.selectedColor = '#ECC15D';
  }

  onSizeChange(size: string): void {
    this.selectedSize = size;
    // console.log(this.selectedSize)
  }
  onColorChange(color: string): void {
    this.selectedColor = color;
    // console.log(this.selectedColor)
  }

  onTab(name:string){
    // console.log(name)
  }
}
