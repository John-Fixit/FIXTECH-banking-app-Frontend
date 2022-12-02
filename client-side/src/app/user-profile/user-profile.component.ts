import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUserAlt as user, faGreaterThan as greaterSign } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user = ""
  public userDetail: any = undefined;
  public isLoading = false;
  public userId:any = ""
  public icons = {user, greaterSign};
  public detail:any = [
    {name: "Name", value: "Full Name" },
    {name: "E-mail Address", value: "E-mail address" },
    {name: "Contact", value:  "Contact" },
    {name: "Address", value:  "Address" },
    {name: "Date of Birth", value: "Date of Birth" },

  ]

    sideNavStatus : boolean = false
  constructor(
    public currentRoute : ActivatedRoute,
    public service : UsersService
  ) { }

  ngOnInit(): void {
    this.userId = this.currentRoute.snapshot.params['id']

    this.user = this.currentRoute.snapshot.params['user']
    this.service.authorizeUser().subscribe(res=>{
      if(res.status){
        this.service.getUserDetail(this.userId).subscribe(res=>{
          this.userDetail = res.userDetail;
          this.isLoading = false;
          this.detail = [
            {name: "Name", value: this.userDetail.firstname + " "+ this.userDetail.lastname},
            {name: "E-mail Address", value: (this.userDetail.email)},
            {name: "Contact", value: this.userDetail.phoneNumber? (this.userDetail.phoneNumber): "Contact" },
            {name: "Address", value: this.userDetail.address? (this.userDetail.address): "Address" },
            {name: "Date of Birth", value: this.userDetail.dob ? (this.userDetail.dob): "Date of Birth" },
          ]
        }, error =>console.log(error)
        )
      }
    })
   
  }

}
