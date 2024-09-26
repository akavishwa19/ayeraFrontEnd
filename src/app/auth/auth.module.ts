import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import {HttpClientModule} from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    AuthPopupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    NgbModalModule
  ]
})
export class AuthModule { }
