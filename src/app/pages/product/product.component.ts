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
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  ModalDismissReasons,
  NgbModal,
  NgbRatingConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs, Mousewheel]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @ViewChild('verticalSwiperRef') swiperRef: ElementRef;
  @ViewChild('infoPara') paraRef: ElementRef;

  productUrl = environment.baseurl + '/product';
  ratingUrl = environment.baseurl + '/rating';
  uploadUrl: string = environment.baseurl + '/upload';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  private modalService = inject(NgbModal);
  closeResult = '';
  uploadedProductImages: any[] = [];
  swiperArray: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  reviews:any[]=[];
  pId: string = '';
  passedSlug: string = '';
  product: any = {
    primary: {
      name: String,
    },
    secondary: {
      name: String,
    },
    tertiary: {
      name: String,
    },
    quaternary: {
      name: String,
    },
  };
  showFaqs: boolean = false;

  sizeArray: any[] = [
    {
      value: '20.7',
    },
    {
      value: '21',
    },
    {
      value: '21.6',
    },
    {
      value: '22',
    },
  ];

  colorArray: any[] = [
    { name: 'Gold', value: '#ECC15D' },
    { name: 'Rose', value: '#BF7D7B' },
    { name: 'Brass', value: '#DDC69A' },
    { name: 'Silver', value: '#B1B1B1' },
    { name: 'Oxidised', value: '#858585' },
  ];

  productTabs: any[] = [
    {
      name: 'Product Description',
    },
    {
      name: 'Jewellery Care',
    },
    {
      name: 'Jewellery Disclaimer',
    },
    {
      name: 'Shipping Information',
    },
    {
      name: 'FAQs',
    },
  ];

  selectedSize: string = '20.7';
  selectedColor: string = '#FF0000';
  expectedDeliveryDate: Date = new Date();

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

  reviewForm: FormGroup = this.fb.group({
    productId:[],
    rating: [null, Validators.required],
    message: [null, Validators.required],
    images: [null],
  });

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private config: NgbRatingConfig,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    config.max = 5;
    const passedSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.passedSlug = passedSlug;
  }

  ngOnInit() {
    this.selectedSize = '20.7';
    this.selectedColor = '#ECC15D';
    this.getProductId();
  }

  onSizeChange(size: string): void {
    this.selectedSize = size;
    // console.log(this.selectedSize)
  }
  onColorChange(color: string): void {
    this.selectedColor = color;
    // console.log(this.selectedColor)
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onTab(name: string) {
    this.showFaqs = false;
    if (name == 'Jewellery Care') {
      this.paraRef.nativeElement.innerHTML = this.product.jewelleryCare;
    } else if (name == 'Product Description') {
      this.paraRef.nativeElement.innerHTML = this.product.productDescription;
    } else if (name == 'Jewellery Disclaimer') {
      this.paraRef.nativeElement.innerHTML = this.product.jewelleryDisclaimer;
    } else if (name == 'Shipping Information') {
      this.paraRef.nativeElement.innerHTML = this.product.shippingInformation;
    } else if (name == 'FAQs') {
      this.showFaqs = true;
    }
  }

  goBack() {
    this.location.back();
  }

  getProductId() {
    this.http
      .get(this.productUrl + '/product-by-slug?slug=' + this.passedSlug)
      .subscribe((res: any) => {
        this.pId = res.data._id;
        this.reviewForm.patchValue({
          productId:this.pId
        })
        this.getProduct();
        this.fetchRatings();
      });
  }

  getProduct() {
    this.http
      .get(this.productUrl + '/main-product?id=' + this.pId)
      .subscribe((res: any) => {
        this.product = res.data;
      });
  }

  onUpload(event: any) {
    const fileInput: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('fileInput')
    );
    const fileName = document.getElementById('fileName');
    this.photoUpload(event);
    console.log(fileInput, fileName);

    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
    } else {
      fileName.textContent = 'No file chosen';
    }
  }

  photoUpload(e: any) {
    var formData: any = new FormData();

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }),
    };
    formData.append('file', (event.target as HTMLInputElement).files[0]);
    this.http
      .post(this.uploadUrl, formData, httpOptions)
      .subscribe((res: any) => {
        this.uploadedProductImages.push(res.data.filename);
        console.log(this.uploadedProductImages);
      });
  }

  sucess(message) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  error(message) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  saveReview() {
    this.reviewForm.patchValue({
      images: this.uploadedProductImages,
    });

    this.http
      .post(this.ratingUrl, this.reviewForm.value)
      .subscribe((res: any) => {
        this.modalService.dismissAll();
        this.sucess('Review posted succesfully');
        this.uploadedProductImages = [];
        this.reviewForm.reset();
        this.fetchRatings()
      });
  }

  removeImage(image:string){
    this.uploadedProductImages=this.uploadedProductImages.filter((x)=>x!=image)
  }

  fetchRatings(){
    this.http.get(this.ratingUrl+'/reviews-by-product?pId='+this.pId).subscribe((res:any)=>{
      this.reviews=res.data
    })
  }

  lineUnlikeReview(id:string){
    
  }
}
