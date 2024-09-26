import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss'
})
export class AuthPopupComponent implements OnInit{
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  authUrl = environment.baseurl + '/users';


  inputType: string = 'password';
  loginScreen:boolean=true;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;


  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: ['', Validators.required],
    mobile: ['', Validators.required],
  });
  
  private modalService = inject(NgbModal);
	closeResult = '';

  constructor(public activeModal: NgbActiveModal, private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,){

  }

  ngOnInit(): void {
     
  }

  toggleScreenSignUp(){
    this.loginScreen=false
  }
  
  toggleScreenLogin(){
    this.loginScreen=true
  }

  get f() {
    return this.form.controls;
  }

  get sf() {
    return this.signupForm.controls;
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

  dismissModal(){
    this.modalService.dismissAll()
  }


  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }),
      withCredentials: true
    };
    this.http.post(this.authUrl + '/web-login', this.form.value,httpOptions).subscribe(
      (res: any) => {
        this.sucess(res.message);  
        this.modalService.dismissAll()
      },
      (error) => {

        this.error(error.error.message);
      }
    );
  }

  togglePasswordType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  signup() {
    this.signupForm.patchValue({
      mobile:this.signupForm.controls['mobile'].value.e164Number
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }),
      withCredentials: true
    };
    this.http.post(this.authUrl + '/register', this.signupForm.value,httpOptions).subscribe(
      (res: any) => {
        this.sucess(res.message);
        this.signupForm.reset();
        this.modalService.dismissAll()
      },
      (error) => {

        this.error(error.error.message);
      }
    );
  }

  
}
