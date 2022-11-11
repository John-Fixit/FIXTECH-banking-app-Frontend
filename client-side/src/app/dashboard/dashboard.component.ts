import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public eyeSwitch:boolean = false
public userDetail:any = undefined;
  constructor(
    public userService : UsersService,
    public router : Router
  ) { 
    
  }
  sideNavStatus : boolean = false

  ngOnInit(): void {
    // this.userDetail = JSON.parse(localStorage['userDetail'])
    this.userService.getUser().subscribe(res=>{
        if(res.status){
          localStorage.setItem('userDetail', JSON.stringify(res.userDetail))
          this.userDetail = res.userDetail;
        }
        else{
          localStorage.removeItem('userToken')
          // this.router.navigate(['/login'])
        }
    })
  }
  switchEye(){
      this.eyeSwitch = !this.eyeSwitch;
  }
}
