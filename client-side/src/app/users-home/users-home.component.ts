import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {
    // public userIdRoute: any = ""
    public userDetail: any = {}
  constructor(
    public userRoute : ActivatedRoute,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
      let userIdRoute = this.userRoute.snapshot.params['id']
      // let usersArray = JSON.parse(localStorage["allUsers"])
      let usersArray = this.userService.getUser()
      this.userDetail = usersArray.find((userItem: any, index: any)=> index==userIdRoute)
      console.log(this.userDetail);
  }

}
