import {Component, inject, TemplateRef} from '@angular/core';
import {NgbOffcanvas, OffcanvasDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination, SwiperOptions,
  Swiper
} from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay
]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private offcanvasService:NgbOffcanvas = inject(NgbOffcanvas);
  private modalService:NgbModal = inject(NgbModal);
  closeResult:string = '';
  activeIndex: number = 0;
  mediaImages:string[]=['assets/images/yourStory.png','assets/images/etNow.png','assets/images/economicTimes.png','assets/images/toi.png','assets/images/ted.png','assets/images/forbes.png','assets/images/indiaToday.png','assets/images/timesNow.png',]
  jewelleryTab:any[]=[
    {
      name:'Temple Jewellery'
    },
    {
      name:'Office Jewellery'
    },
    {
      name:'Fancy Jewellery'
    },
    {
      name:'Couple Jewellery'
    },
    {
      name:'Kids Jewellery'
    },
    {
      name:'Mens Jewellery'
    },
    {
      name:'GenZ Jewellery'
    },
  ]
  shopByMood:any[]=[
    {
      down:true,
      name:'BRIDES MINDSET'
    },
    {
      down:false,
      name:'ROMANTIC DATE'
    },
    {
      down:true,
      name:'BLACK JANE'
    },
    {
      down:false,
      name:'PRINCESS MODE'
    },
    {
      down:true,
      name:'HOUSEWIFE ROUTINE'
    }
  ]

  featuredProductsSwiper: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 1,
    initialSlide:2,
    loop: true,
    centeredSlides:true,
    pagination: true,
    mousewheel: false,
    on: {
      slideChange: (swiper) => this.onSlideChange(swiper)
    },
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
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  };

  testimonialSlider: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 1,
    initialSlide:2,
    loop: true,
    centeredSlides:true,
    pagination: true,
    mousewheel: false,
    breakpoints: {
      400: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 1.6,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1.7,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
    },
  };

  bestSellerWiper: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 1,
    initialSlide:2,
    loop: true,
    centeredSlides:true,
    pagination: false,
    mousewheel: false,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 1.6,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1.7,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  };

  onSlideChange(swiper:Swiper) {
    this.activeIndex = swiper.activeIndex;
    console.log('hi',this.activeIndex)
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
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

  onTab(name:string){

  }
  indentName(name:string){
    return name.replaceAll(' ','<br>')
  }

  hoverClass(i){
    const specialBorderElement:HTMLElement=document.getElementById('border'+i);
    specialBorderElement.style.border='15px solid #020724'
    const textBorder:HTMLElement=document.getElementById('textPad'+i);
    textBorder.style.background='#020724';
    textBorder.style.color='#ffffff';
    textBorder.classList.add('mt-4');
    textBorder.classList.add('mirrorBody');
  }
  removeHoverClass(i){
    const specialBorderElement:HTMLElement=document.getElementById('border'+i);
    specialBorderElement.style.border='none';
    const textBorder:HTMLElement=document.getElementById('textPad'+i);
    textBorder.style.background='#ffffff';
    textBorder.style.color='#020724';
    textBorder.classList.remove('mt-4')
    textBorder.classList.remove('mirrorBody');
  }

}
