import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAccessService {
  loggedIn=new BehaviorSubject<boolean>(false);
  loggedIn$=this.loggedIn.asObservable();

  constructor(){

  }

}
