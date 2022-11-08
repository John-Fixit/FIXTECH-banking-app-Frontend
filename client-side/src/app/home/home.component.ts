import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public userArray: any = []
  constructor(
    public userService : UsersService
  ) { }

  ngOnInit(): void {
      this.userArray = JSON.parse(localStorage["allUsers"])
      // console.log(this.userService.myName);
      
  }
  isCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth
    this.isCollapsed = data.collapsed
  }


}
