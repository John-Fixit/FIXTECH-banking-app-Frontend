import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = environment.url
  constructor(
    private http : HttpClient
  ) { }
 
    getUser(userId: any){
        return this.http.get<any>(`${this.url}/getUserDetail/${userId}`)
    }
}
