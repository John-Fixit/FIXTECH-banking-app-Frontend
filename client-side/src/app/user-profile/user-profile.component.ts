import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user = ""
  public thisUser: any = {}
  public isLoading = false
  constructor(
    public currentRoute : ActivatedRoute,
    public service : ApiService
  ) { }

  ngOnInit(): void {
    this.user = this.currentRoute.snapshot.params['user']
    this.service.getUser(this.user).subscribe(res=>{
      this.thisUser = res;
      this.isLoading = false;
    }, error =>console.log(error)
    
    )
  }

}
