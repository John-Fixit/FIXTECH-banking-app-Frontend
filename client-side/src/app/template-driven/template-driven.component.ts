import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
  public name: any = ""
  public age: any = ""
  public email: any = ""
  public password: any = ""
  public phone_no: any = ""
  constructor() { }

  ngOnInit(): void {
  }

}
