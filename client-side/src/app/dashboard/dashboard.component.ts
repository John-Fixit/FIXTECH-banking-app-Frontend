import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public userService : UsersService
  ) { 
    
  }

  ngOnInit(): void {
    // console.log(this.userService.getUser());
    
    this.userService.getUser().subscribe(res=>{
      console.log(res);
    })
  }
  @Input() collapsed = false
  @Input() screenWidth = 0;

  isCollapsed = false;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth
    this.isCollapsed = data.collapsed
  }
}
