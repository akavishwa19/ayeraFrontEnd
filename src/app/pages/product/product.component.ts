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
import { CartTriggerService } from '../../services/cart-trigger.service';

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
  helpFulUrl: string = environment.baseurl + '/helpful';
  questionAnswerUrl: string = environment.baseurl + '/ques';
  cartUrl: string = environment.baseurl + '/cart';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  private modalService = inject(NgbModal);

  helpfulBoolean: boolean = false;
  closeResult = '';
  uploadedProductImages: any[] = [];
  swiperArray: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  reviews: any[] = [];
  questions: any[] = [];
  pId: string = '';
  currentVariantId: string = null;
  passedSlug: string = '';
  variantByAttribute: any = {};
  ratingOverview: any = {
    totalRatings: Number,
    ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
    },
  };
  averageRating: string = '';
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
    buyItWith: [
      {
        name: String,
      },
      {
        featuredImage: String,
      },
      {
        productCode: String,
      },
      {
        price: Number,
      },
      {
        discount: Number,
      },
      {
        additionalDiscount: Number,
      },
      {
        sellingPrice: Number,
      },
    ],
    buyItWithVariants: [
      {
        name: String,
      },
      {
        featuredImage: String,
      },
      {
        productCode: String,
      },
      {
        price: Number,
      },
      {
        discount: Number,
      },
      {
        additionalDiscount: Number,
      },
      {
        sellingPrice: Number,
      },
    ],
    frequentlyBoughtTogether: [
      {
        additionalDiscount: Number,
        discount: Number,
        price: Number,
        sellingPrice: Number,
        type: String,
        variants: [
          {
            name: String,
            additionalDiscount: Number,
            discount: Number,
            price: Number,
            sellingPrice: Number,
          },
        ],
      },
    ],
    similarProducts: [
      {
        _id: String,
        additionalDiscount: Number,
        featuredImage: String,
        liked: Boolean,
        name: String,
        price: Number,
        sellingPrice: Number,
        type: String,
        similarProductVariant: [
          {
            _id: String,
            additionalDiscount: Number,
            discount: Number,
            name: String,
            price: Number,
            sellingPrice: Number,
          },
        ],
      },
    ],
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
    {
      attributeVariation: {
        name: String,
      },
    },
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
  sortValueReviews: string = '';
  sortOrderReviews: number = null;

  sortValueQuestions: string = '';
  sortOrderQuestions: number = null;

  reviweSorterArray: any[] = [
    {
      id: 1,
      label: 'Highest',
      value: 'rating',
      order: -1,
      checked: false,
    },
    {
      id: 2,
      label: 'Lowest',
      value: 'rating',
      order: 1,
      checked: false,
    },
    {
      id: 3,
      label: 'Most Recent',
      value: 'createdAt',
      order: -1,
      checked: false,
    },
    {
      id: 4,
      label: 'Most Helpful',
      value: 'foundHelpfulCount',
      order: -1,
      checked: false,
    },
  ];

  qAndASorterArray: any[] = [
    {
      id: 1,
      label: 'Answered',
      value: 'answer',
      order: -1,
      checked: false,
    },
    {
      id: 2,
      label: 'Most Recent',
      value: 'createdAt',
      order: -1,
      checked: false,
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
    productId: [],
    rating: [null, Validators.required],
    message: [null, Validators.required],
    images: [null],
  });

  qAndAform: FormGroup = this.fb.group({
    question: [null, Validators.required],
    product_id: [null],
  });

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private config: NgbRatingConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private triggerService:CartTriggerService
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
        // this.reviewForm.patchValue({
        //   productId:this.pId
        // })
        this.getProduct();
        this.fetchRatings();
        this.fetchQuestions();
      });
  }

  detectValueLiked(event: any) {
    this.getProduct();
  }

  getProduct() {
    this.http
      .get(this.productUrl + '/main-product?id=' + this.pId)
      .subscribe((res: any) => {
        this.product = res.data.product;
        // this.colorArray
        if (this.product.type == 'variable') {
          this.colorArray = res.data.variationData;
          this.colorArray = this.colorArray.map((item) => {
            return {
              ...item,
              attributeVariation: {
                ...item.attributeVariation,
                checked: false,
              },
            };
          });

          this.selectColor(
            this.colorArray[0].attributeVariation._id,
            this.colorArray[0]._id
          );
        }
      });
  }

  addToCart() {
    this.http
      .post(this.cartUrl, {
        productId: this.pId,
        variantId: this.currentVariantId,
      })
      .subscribe(
        (res: any) => {
          this.sucess('Product added to cart');
          // this.triggerService.triggerHeaderGetCall()
          this.triggerService.triggerHeaderGetCall();
        },
        (error) => {
          this.error(error.error.message);
        }
      );
  }



  selectColor(id: string, variantId: string) {
    this.currentVariantId = variantId;
    this.colorArray = this.colorArray.map((item) => {
      return {
        ...item,
        attributeVariation: {
          ...item.attributeVariation,
          checked: false,
        },
      };
    });
    const findSingle = this.colorArray.find(
      (x) => x.attributeVariation._id == id
    );
    if (findSingle) {
      findSingle.attributeVariation.checked = true;
      this.findVariantById(id);
    }
    console.log('product:', this.pId, 'variant:', this.currentVariantId);
  }

  findVariantById(id) {
    this.http
      .get(this.productUrl + '/variation-by-attribute-id?id=' + id+'&pId='+this.pId)
      .subscribe((res: any) => {
        this.variantByAttribute = res.data;
        this.product.name = this.variantByAttribute.name;
        this.product.sellingPrice = this.variantByAttribute.sellingPrice;
        this.product.price = this.variantByAttribute.price;
        this.product.discount = this.variantByAttribute.discount;
        this.product.additionalDiscount =
          this.variantByAttribute.additionalDiscount;
        this.product.weight = this.variantByAttribute.weight;
        this.product.images = this.variantByAttribute.images;
        this.product.bannerImage = this.variantByAttribute.bannerImage;
      });
  }

  onUpload(event: any) {
    const fileInput: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('fileInput')
    );
    const fileName = document.getElementById('fileName');
    this.photoUpload(event);

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
      productId: this.pId,
    });

    this.http
      .post(this.ratingUrl, this.reviewForm.value)
      .subscribe((res: any) => {
        this.modalService.dismissAll();
        this.sucess('Review posted succesfully');
        this.uploadedProductImages = [];
        this.reviewForm.reset();
        this.fetchRatings();
      });
  }

  saveQuestion() {
    this.qAndAform.patchValue({
      product_id: this.pId,
    });

    this.http
      .post(this.questionAnswerUrl + '/user', this.qAndAform.value)
      .subscribe((res: any) => {
        this.modalService.dismissAll();
        this.sucess('Question posted succesfully');
        this.qAndAform.reset();
        this.fetchQuestions();
      });
  }

  removeImage(image: string) {
    this.uploadedProductImages = this.uploadedProductImages.filter(
      (x) => x != image
    );
  }

  fetchRatings() {
    this.http
      .get(
        this.ratingUrl +
          '/reviews-by-product?pId=' +
          this.pId +
          '&sortValue=' +
          this.sortValueReviews +
          '&sortOrder=' +
          this.sortOrderReviews
      )
      .subscribe((res: any) => {
        this.reviews = res.data;
        this.fetchReviewOverview();
      });
  }

  upvoteHelpful(id: string) {
    this.http
      .post(this.helpFulUrl + '?pId=' + this.pId + '&ratingId=' + id, {})
      .subscribe((res: any) => {
        this.fetchRatings();
      });
  }
  sortReviews(item) {
    this.reviweSorterArray = this.reviweSorterArray.map((x) => {
      return {
        ...x,
        checked: false,
      };
    });

    let single = this.reviweSorterArray.find((x) => x.id == item.id);

    if (single?.checked == true) {
      single.checked = false;
      this.sortOrderReviews = null;
      this.sortValueReviews = '';
    } else {
      single.checked = true;
      this.sortValueReviews = item.value;
      this.sortOrderReviews = item.order;
    }

    this.fetchRatings();
  }

  sortQuestions(item) {
    this.qAndASorterArray = this.qAndASorterArray.map((x) => {
      return {
        ...x,
        checked: false,
      };
    });

    let single = this.qAndASorterArray.find((x) => x.id == item.id);

    if (single?.checked == true) {
      single.checked = false;
      this.sortOrderQuestions = null;
      this.sortValueQuestions = '';
    } else {
      single.checked = true;
      this.sortValueQuestions = item.value;
      this.sortOrderQuestions = item.order;
    }

    this.fetchQuestions();
  }

  fetchReviewOverview() {
    this.http
      .get(this.ratingUrl + '/review-overview?pId=' + this.pId)
      .subscribe((res: any) => {
        this.ratingOverview = res.data.details;

        this.averageRating = res.data.average;
      });
  }

  progressValue(current, total) {
    const decimalVal = (current / total) * 100;
    return decimalVal;
  }

  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }

  fetchQuestions() {
    this.http
      .get(
        this.questionAnswerUrl +
          '/questions-by-product?pId=' +
          this.pId +
          '&sortValue=' +
          this.sortValueQuestions +
          '&sortOrder=' +
          this.sortOrderQuestions
      )
      .subscribe((res: any) => {
        this.questions = res.data;
      });
  }
}
