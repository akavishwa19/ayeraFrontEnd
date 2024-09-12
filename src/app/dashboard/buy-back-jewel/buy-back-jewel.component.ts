import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-buy-back-jewel',
  templateUrl: './buy-back-jewel.component.html',
  styleUrl: './buy-back-jewel.component.scss'
})
export class BuyBackJewelComponent {
  jewelleryTypeList=[]
  form: FormGroup = this.fb.group({
    typeOfJewel: ['', [Validators.required, Validators.email]],
    stone: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    approxPrice: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    stoneWeight: ['', Validators.required],
    totalWeight: ['', Validators.required],
    productInfo: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  get f() {
    return this.form.controls;
  }


  
  onUpload(event:any){
    const fileInput:HTMLInputElement = <HTMLInputElement>document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');

 
        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }

  }
}
