import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-reactive-form',
  templateUrl: './new-reactive-form.component.html',
  styleUrls: ['./new-reactive-form.component.css']
})
export class NewReactiveFormComponent implements OnInit {

  constructor(
    public formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public allMyForm = this.formBuilder.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    contact: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  


}
