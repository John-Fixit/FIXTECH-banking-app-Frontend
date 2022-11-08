import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public url = environment.url
  public userToken:any = ""

  constructor(
    private http : HttpClient,
  ) { }
  getUser(){
    if(localStorage['userToken']){
      this.userToken =  JSON.parse(localStorage['userToken'])
    }
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${this.userToken}`,
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    })
    const requestOptions = { headers: headers };
    return this.http.get(`${this.url}/authorizeUser`, requestOptions)
  }
  registerUser(userDetail:any){
      return this.http.post<any>(`${this.url}/auth`, userDetail)
  }
}
