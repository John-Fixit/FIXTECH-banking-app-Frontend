import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService{
  private baseUrl = environment.url
  private id = JSON.parse(localStorage['userDetail'])._id
  constructor(
    private _http : HttpClient
  ) { }



  getMonthlyTransactionStat(){ 
      return this._http.get(`${this.baseUrl}/statisticData/${this.id}`)
  }

}
