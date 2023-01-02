import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = environment.url
  constructor(
      private _http : HttpClient
  ) { }

//transfer
    transferFunc(params: any){
      return this._http.post(`${this.baseUrl}/transfer`, params)
    }
//fund account
   fundAccount(params: any){
      return this._http.post(`${this.baseUrl}/topUpWithCard`, params)
   }


}
