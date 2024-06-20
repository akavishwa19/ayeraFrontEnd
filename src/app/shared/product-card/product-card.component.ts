import {Component, inject, Input, TemplateRef} from '@angular/core';
import {NgbModal, NgbOffcanvas, OffcanvasDismissReasons} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() islIked:boolean=false;
  @Input() highlightedTag:string='';
  @Input() productImage:string='';
  @Input() productName:string='';
  @Input() strikedPrice:number=0;
  @Input() discount:number=0;
  @Input() price:number=0;
  @Input() hasSimilarProducts:boolean=false;

  private offcanvasService:NgbOffcanvas = inject(NgbOffcanvas);
  private modalService:NgbModal = inject(NgbModal);
  closeResult:string = '';


  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title',position: 'end'  }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
