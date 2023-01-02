import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-api-calls',
  templateUrl: './api-calls.component.html',
  styleUrls: ['./api-calls.component.css']
})
export class ApiCallsComponent implements OnInit {
  public allUsers: any = []
  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
      this.apiService.getApiUsers().subscribe(data=>{
        console.log(data);
        this.allUsers = data
      }, error=>console.log(error)
      )
  }
}
