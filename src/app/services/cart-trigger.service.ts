import { Injectable , signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartTriggerService {

  cartUrl:string=environment.baseurl+'/cart';

  private _countSignal = signal<number>(0);

  constructor(private http: HttpClient) {}

  get countSignal() {
    return this._countSignal;
  }

  get_cart_count() {
    this.http.get(this.cartUrl + '/cart-count').subscribe(
      (res: any) => {
        this._countSignal.set(res.data);
      },
      (err) => {}
    );
  }

}
