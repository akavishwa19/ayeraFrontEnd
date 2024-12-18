import { HttpClient } from '@angular/common/http';
import {
  Component,
  effect,
  CreateEffectOptions,
  Input,
  OnInit,
  HostListener,
  inject,
  TemplateRef,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { gsap } from 'gsap/gsap-core';
import { CartTriggerService } from '../../services/cart-trigger.service';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthPopupComponent } from '../../auth/auth-popup/auth-popup.component';
import { error } from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  authUrl: string = environment.baseurl + '/users';
  categoryUrl: string = environment.baseurl + '/categories';
  cartUrl: string = environment.baseurl + '/cart';
  imageUrl = environment.imageUrl;
  imageMetaUrl = environment.imageMetaUrl;

  private offcanvasService = inject(NgbOffcanvas);

  allCategories: any[] = [];
  featuredCategoryList: any[] = [];
  secondaryCategoryList: any[] = [];
  tertiaryCategoryList: any[] = [];
  closePanelBoolean: boolean = false;
  cartCount = this.triggerService.countSignal;
  isHidden = false;
  lastScrollTop = 0;
  timeOutId: any;
  megaMenuTimeoutId: any;
  isCollapsed = false;
  megaMenuBoolean: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private triggerService: CartTriggerService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.triggerService.get_cart_count();

    this.fetchPrimaryCategories();
    this.fetchAllCategories();
    // if (this.router.url == '/') {
    //   this.headerLogoAnimation();
    // }
  }

  to_open: string = '';
  toggleCollapse(id: string) {
    this.to_open = id;
    this.isCollapsed = !this.isCollapsed;
  }

  openModal() {
    this.modalService.open(AuthPopupComponent, { size: 'xl', centered: true });
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

  closePanel() {
    this.timeOutId = setTimeout(() => {
      this.closePanelBoolean = false;
    }, 200);
  }

  openPanel() {
    clearTimeout(this.timeOutId);
    this.closePanelBoolean = true;
  }

  closeMegaMenu() {
    this.megaMenuTimeoutId = setTimeout(() => {
      this.megaMenuBoolean = false;
    }, 200);
  }

  openMegaMenus() {
    clearTimeout(this.megaMenuTimeoutId);
    this.megaMenuBoolean = true;
  }

  fetchByPrimary(id: string) {
    this.openPanel();
    this.http
      .get(this.categoryUrl + '/secondary-category?id=' + id)
      .subscribe((res: any) => {
        this.secondaryCategoryList = res.data;
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

  fetchAllCategories() {
    this.http
      .get(this.categoryUrl + '/all-categories')
      .subscribe((res: any) => {
        this.allCategories = res.data;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      // Scroll down
      this.isHidden = true;
    } else {
      // Scroll up
      this.isHidden = false;
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  authCheck() {
    this.http.get(this.authUrl + '/auth-check').subscribe((res: any) => {});
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }

  routeToWishlist() {
    this.http.get(this.authUrl + '/auth-check').subscribe(
      (res: any) => {
        this.router.navigate(['/dashboard/wishlist']);
      },
      (error) => {
        this.openModal();
      }
    );
  }

  openDashboard() {
    this.http.get(this.authUrl + '/auth-check').subscribe(
      (res: any) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.openModal();
      }
    );
  }

  routeToCart(){
    this.http.get(this.authUrl + '/auth-check').subscribe(
      (res: any) => {
        this.router.navigate(['/cart']);
      },
      (error) => {
        this.openModal();
      }
    );
  }
}
