import { HttpClient } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  bannerUrl = environment.baseurl + '/banners';
  categoryUrl = environment.baseurl + '/categories';
  testimonialUrl = environment.baseurl + '/testimonials';
  tagUrl = environment.baseurl + '/tags';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  private offcanvasService: NgbOffcanvas = inject(NgbOffcanvas);
  private modalService: NgbModal = inject(NgbModal);
  closeResult: string = '';
  activeIndex: number = 0;
  @ViewChild('womenOffcanvas', { static: true }) womenOffcanvas;
  @ViewChild('menOffcanvas', { static: true }) menOffcanvas;
  offcanvasRef?: NgbOffcanvasRef;
  offcanvasRef2?: NgbOffcanvasRef;

  selectedCategoryId: string = '';
  homeHeroBanner: any = {};
  homeSliderBanner: any = [];
  menCategories: any[] = [];
  womenCategories: any[] = [];
  secondaryCategorisList: any[] = [];
  featuredTestimnials: any[] = [];
  featuredProductSlider: any[] = [];
  slabList: any[] = [];
  shopByCategoryList: any[] = [];
  featuredTagsList: any[] = [];
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
  homeVideoBanner:any={
    video:String
  };

  featuredProductsSwiper: SwiperOptions = {
    slidesPerView: 2,
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
    autoplay: {
      delay: 3000,
    },
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
    spaceBetween: 20,
    // autoplay: {      
    //   delay: 1500,
    // },
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
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  };
  currentOffcanvas: NgbOffcanvasRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getHeroBanner();
    this.getSliderBanner();
    this.getFeaturedMenWomenCategories();
    this.getTestimonials();
    this.fetchShopByCategoriesList();
    this.fetchFeaturedTags();
    this.headerAnimation();
    this.loadFromRIght();
    this.loadFromLeft();
    this.emerge();
    this.getVideoBanner();
  }

  ngAfterViewInit(): void {
    this.fetchAllSecondaryCategories();
  }

  headerAnimation() {
    gsap.fromTo(
      '.bannerImageContainer',
      {
        y: 0,
      },
      {
        y: -450,
        scrollTrigger: {
          toggleActions: 'restart restart none none',
          scrub: 7,
        },   
        duration: 4,
        immediateRender:false
      }
    );
  }

  loadFromRIght(){
    gsap.fromTo(
      '.loadFromRight',
      {
        x: 200,
      },
      {
        x:0,
        scrollTrigger: {
          toggleActions: 'play restart none none',
        },   
        duration: 0.5,
        immediateRender:false
      }
    );
  }

  loadFromLeft(){
    gsap.fromTo(
      '.loadFromLeft',
      {
        x: -200,
      },
      {
        x:0,
        scrollTrigger: {
          toggleActions: 'play restart none none',
        },   
        duration: 0.5,
        immediateRender:false
      }
    );
  }
  emerge(){
    gsap.fromTo(
      '.emerge',
      {
        y: 200,
      },
      {
        y:0,
        scrollTrigger: {
          toggleActions: 'play none none none',
          start: 'top top',
          end: 'bottom top',
        },   
        duration: 0.5,
        immediateRender:false
      }
    );
  }

  getHeroBanner() {
    this.http
      .get(this.bannerUrl + '/home-hero-banner')
      .subscribe((res: any) => {
        this.homeHeroBanner = res.data;
      });
  }

  getSliderBanner() {
    this.http
      .get(this.bannerUrl + '/home-slider-banners')
      .subscribe((res: any) => {
        this.homeSliderBanner = res.data;
      });
  }

  getVideoBanner(){
    this.http.get(this.bannerUrl+'/home-video-banner').subscribe((res:any)=>{
      this.homeVideoBanner=res.data;
    })
  }

  getFeaturedMenWomenCategories() {
    this.http
      .get(this.categoryUrl + '/featured-men-women-categories')
      .subscribe((res: any) => {
        this.menCategories = res.data.menCategories;
        this.womenCategories = res.data.womenCategories;
      });
  }

  getTestimonials() {
    this.http
      .get(this.testimonialUrl + '/featured-testimonials')
      .subscribe((res: any) => {
        this.featuredTestimnials = res.data;
      });
  }

  onSlideChange(swiper: Swiper) {
    this.activeIndex = swiper.activeIndex;
  }

  onTab(name: string) {}
  indentName(name: string) {
    return name.replaceAll(' ', '<br>');
  }

  hoverClass(i) {
    const specialBorderElement: HTMLElement = document.getElementById(
      'border' + i
    );
    specialBorderElement.style.border = '10px solid #020724';

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

  addSelectPatch(i: number = 0, id: string) {
    const collection: HTMLCollection = <HTMLCollection>(
      document.getElementsByClassName('commonBtnClass')
    );

    for (let element of Array.from(collection)) {
      element.classList.remove('customCategoryButton');
    }

    const element: HTMLElement = <HTMLElement>(
      document.getElementById(`catBtn${i}`)
    );

    element?.classList.add('customCategoryButton');
    this.fetchSlabs(id);
  }

  addSelectPatchPriceSlab(i: number = 0, price: number) {
    const collection: HTMLCollection = <HTMLCollection>(
      document.getElementsByClassName('commonBtnClassPrice')
    );
    for (let element of Array.from(collection)) {
      element.classList.remove('customCategoryButton');
    }

    const element: HTMLElement = <HTMLElement>(
      document.getElementById(`priceSlabBtn${i}`)
    );

    element?.classList.add('customCategoryButton');


    let maxVal = price;
    let minVal = 0;

    if (i > 0) {
      minVal = this.slabList[i - 1];
    }

    this.fetchSlabCorrespondingProducts(
      minVal,
      maxVal,
      this.selectedCategoryId
    );
  }

  fetchSlabCorrespondingProducts(min, max, id) {
    this.http
      .get(
        this.categoryUrl +
          '/products-by-slab?minPrice=' +
          min +
          '&maxPrice=' +
          max +
          '&id=' +
          id
      )
      .subscribe((res: any) => {
        this.featuredProductSlider = res.data;
      });
  }

  fetchAllSecondaryCategories() {
    this.http
      .get(this.categoryUrl + '/all-secondary-category')
      .subscribe((res: any) => {
        this.secondaryCategorisList = res.data;
        this.addSelectPatch(0, res.data[0]._id);
      });
  }

  fetchSlabs(id: string) {
    this.http
      .get(this.categoryUrl + '/secondary-slabs?id=' + id)
      .subscribe((res: any) => {
        this.slabList = res.data;
        this.selectedCategoryId = id;
        this.addSelectPatchPriceSlab(0, res.data[0]);
      });
  }

  fetchShopByCategoriesList() {
    this.http.get(this.categoryUrl + '/tertiary-home').subscribe((res: any) => {
      this.shopByCategoryList = res.data;
    });
  }

  fetchFeaturedTags() {
    this.http.get(this.tagUrl + '/featured-tags').subscribe((res: any) => {
      this.featuredTagsList = res.data;
      for (let i = 0; i < this.featuredTagsList.length; i++) {
        if (i % 2 == 0) {
          this.featuredTagsList[i].down = true;
        } else {
          this.featuredTagsList[i].down = false;
        }
      }

    });
  }

  routeToShop(slug: string) {
    this.currentOffcanvas?.dismiss();
    this.router.navigate(['/shop/tertiary/', slug]);
  }

  routeToShopViaTags(id: string) {
    this.currentOffcanvas?.dismiss();
    this.router.navigate(['/shop/primary/']);
  }

  routeToProduct(slug:string){
    this.router.navigate(['/product/'+slug])
  }

  navigateToReference(url){
    window.open(url)
  }
}
