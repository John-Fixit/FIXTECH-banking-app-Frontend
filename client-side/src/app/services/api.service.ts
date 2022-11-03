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

    getApiUsers(){
      return this.http.get<any>(this.url)
    }
    
    getUser(user: any){
        return this.http.get<any>(`${this.url}/${user}`)
    }
}
