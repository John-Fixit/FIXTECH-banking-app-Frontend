import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public myName = ''
  constructor() { }
  getUser(){
    return JSON.parse(localStorage['allUsers'])
  }
}
