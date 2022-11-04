import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public message = ""
  public url = environment.url
  constructor(
    public navigateRoute : Router,
    public userService: UsersService,
    public formBuilder : FormBuilder,
    private http : HttpClient,
  ) { }

  ngOnInit(): void {
      this.http.get<any>(this.url).subscribe(res=>{
        console.log(res);
        
      })
  }
  public contactRegex = /^[0][\d]{10}$/
  public formGroup = this.formBuilder.group({
    firstname: ["", [Validators.required, Validators.minLength(2)]],
    lastname: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    contact: ["", [Validators.required, Validators.pattern(this.contactRegex)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    co_password: ["", [Validators.required]],
  })


  handleRegister(){
    event?.preventDefault()

    let userDetail = {firstname: this.formGroup.value['firstname'], lastname: this.formGroup.value['lastname'], email: this.formGroup.value['email'], contact: this.formGroup.value['contact'], password: this.formGroup.value['password']}
    if(this.formGroup.value['firstname'] != "" || this.formGroup.value['lastname'] !="" || this.formGroup.value['email'] != "" || this.formGroup.value['contact'] !="" || this.formGroup.value['password']!=""){

      this.userService.registerUser(userDetail).subscribe(response=> {
        console.log(response);

      })
    }
    else{
      this.message = "All input must be filled before proceeding"
    }
  }

 
  }

