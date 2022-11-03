import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    public navigateRoute : Router,
    public userService: UsersService,
    public formBuilder : FormBuilder
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
    
    let userDetail = {firstname: this.formGroup.value['firstname'], lastname: this.formGroup.value['lastname'], email: this.formGroup.value['email'], contact: this.formGroup.value['contact'], password: this.formGroup.value['password']}
    
    
    this.userService.registerUser(userDetail)
  }

 
  }

