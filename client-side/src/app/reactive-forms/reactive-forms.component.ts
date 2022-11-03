import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder
  ) { }

  public userForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.maxLength(30)]],
    email: ["", [Validators.required, Validators.email]],
    age: ["", [Validators.required, Validators.min(10)]],
    password: ["", [Validators.required, Validators.minLength(6)]]

  })
  ngOnInit(): void {
  }

}
