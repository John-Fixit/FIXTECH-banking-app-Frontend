import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = ""
  public password: string = ""
  public message : string = ""
  public allUser: any = []
  constructor(
      public userService: UsersService,
      public route : Router
  ) { }

  ngOnInit(): void {
    this.allUser = this.userService.getUser()
  }
  login(){
      let found = this.allUser.find((user:any, index: any)=> user.email == this.email)
      this.userService.myName='john'
      if(found){
        localStorage.setItem('email', JSON.stringify(found.email))
        this.route.navigate(['/'])
      }
      else{
          this.message = 'User details is not correct'
      }
  }

}
