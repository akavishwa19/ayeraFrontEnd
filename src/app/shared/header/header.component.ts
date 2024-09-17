import { HttpClient } from '@angular/common/http';
import {
  Component,
  effect,
  CreateEffectOptions,
  Input,
  OnInit,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { gsap } from 'gsap/gsap-core';
import { CartTriggerService } from '../../services/cart-trigger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  categoryUrl: string = environment.baseurl + '/categories';
  cartUrl: string = environment.baseurl + '/cart';

  featuredCategoryList: any[] = [];
  secondaryCategoryList: any[] = [];
  tertiaryCategoryList: any[] = [];
  closePanelBoolean: boolean = false;
  cartCount: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private triggerService: CartTriggerService
  ) {
    // const options: CreateEffectOptions = {
    //   allowSignalWrites: true
    // };
    // effect(() => {
    //   if (this.triggerService.triggerGetCall()) {
    //     this.getCartCount();
    //     this.triggerService.resetTrigger();
    //   }
    // }, options);
  }
  ngOnInit() {
    this.getCartCount();
    this.triggerService.triggerGetCall$.subscribe((trigger)=>{
      if(trigger){
        this.getCartCount();
      }
    })

    this.fetchPrimaryCategories();
    if (this.router.url == '/') {
      this.headerLogoAnimation();
    }
  }

  headerLogoAnimation() {
    gsap.fromTo(
      '.aayraHeaderLogoHolder',
      {
        y: 80,
      },
      {
        y: 0,
        scrollTrigger: {
          toggleActions: 'restart restart none none',
          scrub: 2,
          start: 'top top',
          end: 'bottom top',
        },
        duration: 0.3,
        immediateRender: false,
      }
    );
  }
  fetchPrimaryCategories() {
    this.http
      .get(this.categoryUrl + '/primary-category')
      .subscribe((res: any) => {
        this.featuredCategoryList = res.data;
      });
  }

  routeToShop(slug: string) {
    this.router.navigate(['/shop/primary/', slug]);
  }

  fetchByPrimary(id: string) {
    this.http
      .get(this.categoryUrl + '/secondary-category?id=' + id)
      .subscribe((res: any) => {
        this.secondaryCategoryList = res.data;
        this.closePanelBoolean = true;
      });
  }

  fetchBySecondary(id: string) {
    this.http
      .get(this.categoryUrl + '/tertiary-category?id=' + id)
      .subscribe((res: any) => {
        this.tertiaryCategoryList = res.data;
      });
  }

  getCartCount() {
    this.http.get(this.cartUrl + '/cart-count').subscribe((res: any) => {
      this.cartCount = res.data;
    });
  }
}
