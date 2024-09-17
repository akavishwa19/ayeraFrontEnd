import { Injectable , signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartTriggerService {

  private triggerGetCall = new BehaviorSubject<boolean>(false);

  triggerGetCall$ = this.triggerGetCall.asObservable();

  constructor() { }

  triggerHeaderGetCall() {
    this.triggerGetCall.next(true);
  }

  // triggerHeaderGetCall(){
  //   this.triggerGetCall.set(true)
  // }

  // resetTrigger(){
  //   this.triggerGetCall.set(false)
  // }

}
