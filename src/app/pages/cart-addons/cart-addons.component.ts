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
import { MessageService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import moment from 'moment';

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs, Mousewheel]);

@Component({
  selector: 'app-cart-addons',
  templateUrl: './cart-addons.component.html',
  styleUrl: './cart-addons.component.scss',
})
export class CartAddonsComponent {

  cartUrl:string=environment.baseurl+'/cart';
  addressUrl:string=environment.baseurl+'/address';
  authUrl = environment.baseurl + '/users';
  orderUrl = environment.baseurl + '/orders';
  couponUrl:string=environment.baseurl+'/coupon';
  imageUrl: string = environment.imageUrl;
  imageMetaUrl: string = environment.imageMetaUrl;

  selectedCouponId:string='';
  intervalId:any;
  selectedCoupon:any={};
  selectedPaymentMode='Cash on delivery'
  billDetails:any={};
  cartCount:number=0;
  responseHoldTime:any;
  
  minutes: any = 0;
  seconds: any = 0;
  productList = [
    {
      _id: '66b491093659d7ad14a8d1cb',
      featuredImage: 'original1723209897193_Frame527.png',
      productCode: '2408RLHHI',
    },
    {
      _id: '66b4919d3659d7ad14a8d1f6',
      featuredImage: 'original1723209906027_Frame527.png',
      productCode: '24083NYQF',
    },
    {
      _id: '66b494e43659d7ad14a8d213',
      featuredImage: 'original1723209874593_Frame527.png',
      productCode: '2408FEYZV',
    },
    {
      _id: '66b498f43659d7ad14a8d23d',
      featuredImage: 'original1723209781986_Frame527.png',
      productCode: '2408RXFMG',
    },
  ];
  cartCards:any[]=[
    {
      coupon:{
        couponCode:String,
        description:String
      },
      productId:{
        featuredImage:String,
        name:String,
        productCode:String,

      },
      variantId:{
        images:[String],
        name:String,
        
      }
    }
  ];
  couponBoolean:boolean=false;
  addressBoolean:Boolean=false;
  addressList:any[]=[];
  shippingAddressList:any[]=[];
  billingAddressList:any[]=[];
  coupons:any[]=[
    {
      couponCode:String,
      description:String
    }
  ];
  private modalService = inject(NgbModal);
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
  selectedShippingAddress:string='';
  selectedBillingAddress:string='';
  expiryTime:any;


  inputType: string = 'password';
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;

  countryList = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: "Cote D'Ivoire", code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: "Korea, Democratic People'S Republic of", code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: "Lao People'S Democratic Republic", code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ];
  searchQuery:string='';

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    address: ['', Validators.required],
    additionalInfo: ['', Validators.required],
    pincode: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    mobile: ['', Validators.required],
    alternateMobile:['',Validators.required],
    addressName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http:HttpClient,
    private location:Location,
    private router:Router
  ) {}

  ngOnInit(){
    this.getAddresses();
    this.fetchCart();
    this.fetchCoupons();
    this.holdStock();
    this.updateStock();
  }

  get f() {
    return this.form.controls;
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

  addAddress(){
    this.form.patchValue({
      mobile:this.form.controls['mobile'].value.e164Number,
      alternateMobile:this.form.controls['alternateMobile'].value.e164Number,
    })
    this.http.post(this.addressUrl,this.form.value).subscribe((res:any)=>{
      this.form.reset();
      this.modalService.dismissAll();
      this.getAddresses();
      this.sucess('address added succesfully')
    })
  }

  getAddresses(){
    this.http.get(this.addressUrl+'/by-user').subscribe((res:any)=>{
      this.addressList=res.data;
      this.updateOtherAddresses()
    })
  }

  updateOtherAddresses(){
    this.billingAddressList=this.addressList.map((x)=>{
      return{
        ...x,
        checked:false
      }
    });
    this.shippingAddressList=this.addressList.map((x)=>{
      return{
        ...x,
        checked:false
      }
    });
  }

  markBillingAddress(id:string){
    this.billingAddressList=this.billingAddressList.map((x)=>{
      return {
        ...x,
        checked:false
      }
    })
    const findSingle=this.billingAddressList.find((x)=>x._id==id)
    if (findSingle) {
      findSingle.checked = true;
    }
    this.selectedBillingAddress=id

  }

  markShippingAddress(id:string){
    this.shippingAddressList=this.shippingAddressList.map((x)=>{
      return {
        ...x,
        checked:false
      }
    })
    const findSingle=this.shippingAddressList.find((x)=>x._id==id)
    if (findSingle) {
      findSingle.checked = true;
    }
    this.selectedShippingAddress=id

  }

  singleAddress(id){
    this.http.get(this.addressUrl+'/single?id='+id).subscribe((res:any)=>{
      this.form.patchValue(res.data);

    })
  }

  openBackDropCustomClass(content: TemplateRef<any>) {
    this.addressBoolean=false;
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openBackDropCustomClassWithId(content: TemplateRef<any>,id:string) {
    this.addressBoolean=true;
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    this.singleAddress(id)
  }

  onUpload(event:any){
    const fileInput:HTMLInputElement = <HTMLInputElement>document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
 
        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }

  }

  mark(val:string){
    const blackDot:HTMLCollection=<HTMLCollection>document.getElementsByClassName('blackDot');
    for (let i = 0; i < blackDot.length; i++) {
      const dot = blackDot[i] as HTMLElement;
      dot.style.background = '#FFFFFF'; 
  }
    const element:HTMLElement=<HTMLElement>document.getElementById(`rc-${val}`)
    element.style.background='#020724'
  }

  fetchBill(){
    this.http.get(this.cartUrl+'/bill').subscribe((res:any)=>{
      this.billDetails=res.data;
    })
  }

  fetchCart(){
    this.http.get(this.cartUrl).subscribe((res:any)=>{
      this.cartCards=res.data;
      this.fetchBill();
      this.getCartCount();
    })
  }

  getCartCount(){
    this.http.get(this.cartUrl+'/cart-count').subscribe((res:any)=>{
      this.cartCount=res.data
    })
  }

  scrollUp(){
    window.scroll(0,0)
  }

  goBack(){
    this.location.back()
  }

  checkOut(){
    this.http.post(this.orderUrl+'/checkout',{billingAddress:this.selectedBillingAddress,shippingAddress:this.selectedShippingAddress,paymentMode:this.selectedPaymentMode}).subscribe((res:any)=>{

      this.router.navigate(['/'])
      this.sucess('Order placed successfully');
      
    },
  (error)=>{
    this.error(error.error.message)
  })
  }

  fetchCoupons(){
    this.http.get(this.couponUrl+'/fetch-available-coupons?searchQuery='+this.searchQuery).subscribe((res:any)=>{
      this.coupons=res.data;
      // this.selectedCoupon=this.coupons[0]._id;
      // console.log(this.coupons)
      this.selectedCouponId=this.coupons[0]._id;
    })
  }

  applyCoupon(id:string){
    this.couponBoolean=true;
    this.selectedCouponId=id;
    this.fetchCouponById(id)
  }

  fetchCouponById(id:string){
    this.http.get(this.couponUrl + '/selected-coupon?id='+id).subscribe((res:any)=>{
      this.selectedCoupon=res.data;
    })
  }

  applySelectedCoupon(){
    this.http.put(this.couponUrl+'/apply-coupon?couponId='+this.selectedCouponId,{}).subscribe((res:any)=>{
      this.fetchCart()
    })
  }

  removeSelectedCoupon(){
    this.http.put(this.couponUrl+'/remove-coupon',{}).subscribe((res:any)=>{
      this.fetchCart()
    })
  }

  holdStock(){
    this.http.post(this.orderUrl+'/hold',{}).subscribe((res:any)=>{
      this.responseHoldTime=res.data.holdTime;
      console.log(this.responseHoldTime)
      this.expiryTime=moment().add(this.responseHoldTime, 'minutes');
      this.intervalId=setInterval(() => {
        this.changeTimer();
      }, 1000);
    })
  }

  changeTimer(){
    let now = moment();
    const diffInSeconds = this.expiryTime.diff(now, 'seconds');
    if (diffInSeconds <= 0) {
      console.log(diffInSeconds)
      this.minutes = 0;
      this.seconds = 0;
      clearTimeout(this.intervalId);
      this.router.navigate(['/cart'])
      return; 
    }
    this.minutes = Math.floor(diffInSeconds / 60);
    this.minutes=this.minutes.toString().padStart(2,"0");
    this.seconds = diffInSeconds % 60;
    this.seconds=this.seconds.toString().padStart(2,"0");
  }

  updateStock(){
    this.http.post(this.orderUrl+'/update-stock',{}).subscribe((res:any)=>{

    })
  }

}
