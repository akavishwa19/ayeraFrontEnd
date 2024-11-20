import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  NgbModal,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthPopupComponent } from '../../auth/auth-popup/auth-popup.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() productId: string = '';
  @Input() islIked: boolean = false;
  @Input() highlightedTag: string = '';
  @Input() productImage: string = '';
  @Input() productName: string = '';
  @Input() strikedPrice: number = 0;
  @Input() discount: number = 0;
  @Input() additionalDiscount: number = 0;
  @Input() price: number = 0;
  @Input() hasSimilarProducts: boolean = false;
  @Input() slug: string = '';

  @Output() valueLiked: EventEmitter<Object> = new EventEmitter<Object>();

  authUrl:string=environment.baseurl+'/users';
  wishlistUrl = environment.baseurl + '/wishlist';
  productUrl = environment.baseurl + '/product';
  variantUrl = environment.baseurl + '/variant';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  private offcanvasService: NgbOffcanvas = inject(NgbOffcanvas);
  private modalService: NgbModal = inject(NgbModal);
  private http: HttpClient = inject(HttpClient);
  closeResult: string = '';
  selectedProduct: any = {};
  selectedVariant: any[] = [{}];
  similarProductsArray: any[] = [

   
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openModal() {
    this.modalService.open(AuthPopupComponent, { size: 'xl', centered: true });
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, {
        ariaLabelledBy: 'offcanvas-basic-title',
        position: 'end',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.getSingleProduct();
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

  handleLike(id: string) {
    this.http.get(this.authUrl+'/auth-check').subscribe((res:any)=>{
      this.http.post(this.wishlistUrl + '?id=' + id, {}).subscribe((res: any) => {
        this.valueLiked.emit({ response: 'value changed' });
      });
    },(error)=>{
      this.openModal()
    })

    
  }

  routeToProduct() {
    this.router.navigate(['/product', this.slug]);
  }

  getSingleProduct() {
    this.http
      .get(this.productUrl + '/single?id=' + this.productId)
      .subscribe((res: any) => {
        this.selectedProduct = res.data;
        console.log('selected product:',this.selectedProduct)
        if (this.selectedProduct.type === 'variable') {
          this.getVariantsByProduct();
        }
        this.getSimilarProducts();
      });
  }

  getVariantsByProduct() {
    this.http
      .get(this.variantUrl + '/variants-by-product?id=' + this.productId)
      .subscribe((res: any) => {
        this.selectedVariant = res.data;
      });
  }

  getSimilarProducts() {
    this.http
      .get(this.productUrl + '/similar-products?id=' + this.productId)
      .subscribe((res: any) => {

        this.similarProductsArray = res.data;
        console.log('similar products array:',this.similarProductsArray)
      });
  }
}
