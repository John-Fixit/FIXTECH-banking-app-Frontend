import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
import { Router } from '@angular/router'
import { faEye, faEyeSlash, faMoneyBill, faMoneyCheckAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public eyeSwitch:boolean = false
  public userDetail:any = undefined;
  public lastTransaction: any = []
  
  icons = { faEye, faEyeSlash, faMoneyBill }
  constructor(
    public userService : UsersService,
    public router : Router
  ) { 
    
  }
  sideNavStatus : boolean = false

  ngOnInit(): void {
    this.userService.authorizeUser().subscribe((res)=>{
        if(res.status){
          localStorage.setItem('userDetail', JSON.stringify(res.userDetail))
          this.userDetail = res.userDetail;  
          console.log(this.userDetail);
          this.lastTransaction = this.userDetail.transactionType[this.userDetail.transactionType.length-1]
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
