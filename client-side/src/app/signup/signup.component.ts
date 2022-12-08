import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public message = ""
  public url = environment.url
  public isLoading = false
  public resStatus:any = undefined
  public resMessage:any = ""

  constructor(
    public navigateRoute : Router,
    public userService: UsersService,
    public formBuilder : FormBuilder,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
      
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
    let accountNumber = '2'+(Math.floor(100000000 + Math.random() * 900000000))
    
    let userDetail = {
      firstname: this.formGroup.value['firstname'], 
      lastname: this.formGroup.value['lastname'], 
      email: this.formGroup.value['email'], 
      phoneNumber: this.formGroup.value['contact'], 
      password: this.formGroup.value['password'], 
      accountNumber: accountNumber, 
      totalBalance: 1000,
      transactionType: [],
      profile_picture: ""
    }

    if(this.formGroup.value['firstname'] == "" || this.formGroup.value['lastname'] =="" || this.formGroup.value['email'] == "" || this.formGroup.value['contact'] =="" || this.formGroup.value['password']==""){
      this.message = "All input must be filled before proceeding"

    }
    else{
      if(this.formGroup.value['password'] == this.formGroup.value['co_password']){
        this.isLoading = true
        this.userService.registerUser(userDetail).subscribe(response=> {
          this.resStatus = response.status                                                                                            
          this.message = response.message
          this.isLoading = false
        }, error=> {
          console.log(error);
        })
      }
      else{
        
        this.message = "Password and confirm password entered doesn't match each other. Please check and re-type it."
        
      }
    }
  }

 
  }

