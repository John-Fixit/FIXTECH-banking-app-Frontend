import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public url = environment.url
  public userToken:any = ""

  constructor(
    private http : HttpClient,
    public router : Router
  ) { }

  //authorization code
  getUser(){
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
}
