import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService implements OnInit{
  private baseUrl = environment.url

  constructor(
    private _http: HttpClient,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
 
  }
  
  editProfile(id:any, detail:any){
      return this._http.post(`${this.baseUrl}/editProfile/${id}`, detail) 
  }   
}
