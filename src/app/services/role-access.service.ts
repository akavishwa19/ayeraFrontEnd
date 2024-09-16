import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAccessService {
  usersUrl = environment.baseurl + '/users';

  responseObject: any = {};
  userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getLoggedInUser() {
    this.http.get(this.usersUrl + '/find-user').subscribe((res: any) => {
      this.userSubject.next(res.data);
    });
  }

  getUserDetails() {
    return this.userSubject.asObservable();
  }

}
