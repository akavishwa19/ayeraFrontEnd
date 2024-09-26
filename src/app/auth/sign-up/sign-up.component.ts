import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  authUrl = environment.baseurl + '/users';

  inputType: string = 'password';
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
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: ['', Validators.required],
    mobile: ['', Validators.required],
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
  
  ) {}

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

  togglePasswordType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  signup() {
    this.form.patchValue({
      mobile:this.form.controls['mobile'].value.e164Number
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }),
      withCredentials: true
    };
    this.http.post(this.authUrl + '/register', this.form.value,httpOptions).subscribe(
      (res: any) => {
        this.sucess(res.message);
        this.form.reset()
      },
      (error) => {

        this.error(error.error.message);
      }
    );
  }
}
