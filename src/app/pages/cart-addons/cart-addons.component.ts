import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import SwiperCore, {
  Navigation,
  Autoplay,
  Thumbs,
  Mousewheel,
  Pagination,
  SwiperOptions,
  Swiper,
} from 'swiper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs, Mousewheel]);

@Component({
  selector: 'app-cart-addons',
  templateUrl: './cart-addons.component.html',
  styleUrl: './cart-addons.component.scss'
})
export class CartAddonsComponent {
  RecommendedSwiperOptions: SwiperOptions = {
    spaceBetween: 4.2,
    initialSlide: 2,
    loop: true,

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
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3.1,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 4.2,
        spaceBetween: 20,
      },
    },
  };
}
