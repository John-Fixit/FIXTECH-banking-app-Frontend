import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public baseUrl = environment.url
  public message: any = ""
  constructor(
      public userService: UsersService,
      public route : Router,
      public formBuilder : FormBuilder,
      public http : HttpClient,
  ) { }

  ngOnInit(): void {
   
  }
  
  public formGroup = this.formBuilder.group({
    accountNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ["", [Validators.required]],
  })

  handleLogin(){
      event?.preventDefault();
      let accountNumber = this.formGroup.value['accountNumber'] 
      let password = this.formGroup.value['password']
      if(accountNumber == "" || password == ""){
        this.message = "All input must be filled before proceeding!!!"
      }
      else{
      this.http.post<any>(`${this.baseUrl}/authLogin`, {accountNumber, password}).subscribe((res)=>{   
        if(res.status){
          localStorage.setItem('userToken', JSON.stringify(res.token))
          this.route.navigate(['/home/'])
        }
        else{
            this.message = res.message
        }
      }, error=>{
        console.log(error);
      })
    }
  }

}
