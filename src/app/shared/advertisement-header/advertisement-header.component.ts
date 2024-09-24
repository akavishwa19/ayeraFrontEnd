import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-advertisement-header',
  templateUrl: './advertisement-header.component.html',
  styleUrl: './advertisement-header.component.scss'
})
export class AdvertisementHeaderComponent {
  checked: boolean = false;

  isHidden = false;
  lastScrollTop = 0;
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      // Scroll down
      this.isHidden = true;
    } else {
      // Scroll up
      this.isHidden = false;
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

}
