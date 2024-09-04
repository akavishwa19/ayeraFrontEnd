import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aayra';
  showDiv:boolean=false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 0) {
      this.showDiv = true;
    } else {
      this.showDiv = false;
    }
  }

  scrollTop(){
    window.scroll(0,0)
  } 
}
