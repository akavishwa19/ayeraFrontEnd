import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import {
  NgbOffcanvas,
  NgbOffcanvasRef,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  SwiperOptions,
  Swiper,
} from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private offcanvasService: NgbOffcanvas = inject(NgbOffcanvas);
  private modalService: NgbModal = inject(NgbModal);
  closeResult: string = '';
  activeIndex: number = 0;
  @ViewChild('womenOffcanvas', { static: true }) womenOffcanvas;
  @ViewChild('menOffcanvas', { static: true }) menOffcanvas;
  offcanvasRef?: NgbOffcanvasRef;
  offcanvasRef2?: NgbOffcanvasRef;

  mediaImages: string[] = [
    'assets/images/yourStory.png',
    'assets/images/etNow.png',
    'assets/images/economicTimes.png',
    'assets/images/toi.png',
    'assets/images/ted.png',
    'assets/images/forbes.png',
    'assets/images/indiaToday.png',
    'assets/images/timesNow.png',
  ];
  jewelleryTab: any[] = [
    {
      name: 'Temple Jewellery',
    },
    {
      name: 'Office Jewellery',
    },
    {
      name: 'Fancy Jewellery',
    },
    {
      name: 'Couple Jewellery',
    },
    {
      name: 'Kids Jewellery',
    },
    {
      name: 'Mens Jewellery',
    },
    {
      name: 'GenZ Jewellery',
    },
    {
      name: 'Temple Jewellery',
    },
    {
      name: 'Office Jewellery',
    },
    {
      name: 'Fancy Jewellery',
    },
    {
      name: 'Couple Jewellery',
    },
    {
      name: 'Kids Jewellery',
    },
    {
      name: 'Mens Jewellery',
    },
    {
      name: 'GenZ Jewellery',
    },
  ];
  shopByMood: any[] = [
    {
      down: true,
      name: 'BRIDES MINDSET',
    },
    {
      down: false,
      name: 'ROMANTIC DATE',
    },
    {
      down: true,
      name: 'BLACK JANE',
    },
    {
      down: false,
      name: 'PRINCESS MODE',
    },
    {
      down: true,
      name: 'HOUSEWIFE ROUTINE',
    },
    {
      down: false,
      name: 'BRIDES MINDSET',
    },
    {
      down: true,
      name: 'ROMANTIC DATE',
    },
  ];

  featuredProductsSwiper: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 1,
    initialSlide: 2,
    loop: true,
    centeredSlides: true,
    pagination: true,
    mousewheel: false,
    on: {
      slideChange: (swiper) => this.onSlideChange(swiper),
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
    initialSlide: 2,
    loop: true,
    centeredSlides: true,
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
    initialSlide: 2,
    loop: true,
    centeredSlides: true,
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
  currentOffcanvas: NgbOffcanvasRef;

  onSlideChange(swiper: Swiper) {
    this.activeIndex = swiper.activeIndex;
    console.log('hi', this.activeIndex);
  }

  onTab(name: string) {}
  indentName(name: string) {
    return name.replaceAll(' ', '<br>');
  }

  hoverClass(i) {
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
  open(content, options = {}) {
    this.currentOffcanvas = this.offcanvasService.open(content, options);
  }
  toggleOffcanvas(offcanvas: string) {
    if (this.currentOffcanvas) {
      this.currentOffcanvas.dismiss();
    }

    if (offcanvas === 'women') {
      this.open(this.womenOffcanvas);
    } else if (offcanvas === 'men') {
      this.open(this.menOffcanvas, { position: 'end' });
    }
  }

  switchToMen() {
    if (this.currentOffcanvas) {
      this.currentOffcanvas.dismiss();
      this.currentOffcanvas.result.then(
        () => {
          this.open(this.menOffcanvas, { position: 'end' });
        },
        () => {
          this.open(this.menOffcanvas, { position: 'end' });
        }
      );
    } else {
      this.open(this.menOffcanvas, { position: 'end' });
    }
  }

  switchToWomen() {
    if (this.currentOffcanvas) {
      this.currentOffcanvas.dismiss();
      this.currentOffcanvas.result.then(
        () => {
          this.open(this.womenOffcanvas);
        },
        () => {
          this.open(this.womenOffcanvas);
        }
      );
    } else {
      this.open(this.womenOffcanvas);
    }
  }
}
