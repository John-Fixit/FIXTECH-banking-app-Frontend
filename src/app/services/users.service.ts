import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{
  public url = environment.url
  public userToken:any = ""
  public userDetail:BehaviorSubject<any> = new BehaviorSubject({})
  constructor(
    private http : HttpClient,
    public router : Router
  ) { }

  ngOnInit(): void {
    
  }


  //authorization code
  authorizeUser(){
    if(localStorage['userToken']){
      this.userToken =  JSON.parse(localStorage['userToken'])
    }
    else{
        // this.router.navigate(['/login'])
    }
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${this.userToken}`,
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    })
    const requestOptions = { headers: headers };
    return this.http.get<any>(`${this.url}/authorizeUser`, requestOptions)
  }

  //sign up
  registerUser(userDetail:any){
      return this.http.post<any>(`${this.url}/auth`, userDetail)
  }
  //get particular user details
  getUserDetail(userId:any){
      return this.http.get<any>(`${this.url}/getUserDetail/${userId}`)
  }
  //get all the users
  getUsers(){
      return this.http.get<any>(`${this.url}/users`)
  }

}
