import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { LogService } from '../services/log.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName = "";
  public lastName = "";
  public email = "";
  public password = "";
  public userArray: any = []
  public message:string = ""

  constructor(
    public navigateRoute : Router,
    public userService: UsersService,
    public logService: LogService
  ) { }

  ngOnInit(): void {
      this.userArray = this.userService.getUser()
      console.log(this.logService.consoleLog());
      
  }

  signup(){
    let userDetails = {firstName:this.firstName, lastName: this.lastName, email: this.email, password: this.password}
    if(this.firstName == "" || this.lastName =="" || this.email =="" || this.password  == ""){
      alert(`Please kindly filled up the required infomation`)
    }else{
      this.userArray.push(userDetails)
      localStorage.setItem('allUsers', JSON.stringify(this.userArray))
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password= ""
      this.message = "Great! User Registered successfully"
      this.navigateRoute.navigate(['/'])
    }
  }
    
  }

