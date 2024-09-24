import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  authUrl:string=environment.baseurl+'/users';
  loggedInUser:any={};

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(): void {
      this.getUser()
  }

  getUser(){
    this.http.get(this.authUrl+'/single').subscribe((res:any)=>{
      this.loggedInUser=res.data;
    })
  }
}
