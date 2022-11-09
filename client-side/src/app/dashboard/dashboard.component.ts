import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
import { Router } from '@angular/router'
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
    public userService : UsersService,
    public router : Router
  ) { 
    
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
        if(res.status){
          localStorage.setItem('userDetail', JSON.stringify(res.userDetail))
        }
        else{
          localStorage.removeItem('userToken')
          this.router.navigate(['/login'])
        }
    })
  }
  sideNavStatus : boolean = false
}
