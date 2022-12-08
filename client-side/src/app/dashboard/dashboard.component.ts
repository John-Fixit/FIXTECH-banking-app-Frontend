import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
import { Router } from '@angular/router'
import { faEye, faEyeSlash, faMoneyBill, faMoneyCheckAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'angular-toastify'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public eyeSwitch:boolean = false
  public userDetail:any = undefined;
  public lastTransaction: any = {}
  public emptyObj:boolean = true
  icons = { faEye, faEyeSlash, faMoneyBill }
  constructor(
    public userService : UsersService,
    public router : Router,
    public _toastService: ToastService
  ) { 
    
  }
  sideNavStatus : boolean = false

  ngOnInit(): void {
    this.userService.authorizeUser().subscribe((res)=>{
        if(res.status){
          localStorage.setItem('userDetail', JSON.stringify(res.userDetail))
          this.userDetail = res.userDetail;  
          this.userService.userDetail.next(res.userDetail)
          Object.keys(this.userDetail).length == 0
          this.lastTransaction = this.userDetail.transactionType[this.userDetail.transactionType.length-1]
        
            this.emptyObj = Object.keys(this.lastTransaction).length === 0? true: false
            localStorage.setItem('userId', JSON.stringify(res.userDetail._id))
        }
        else{
          localStorage.removeItem('userToken')
          // this.router.navigate(['/login'])
        }
    })
    if(this.userDetail){
      this.addInfoToast()
    }
    
  } 
  switchEye(){
      this.eyeSwitch = !this.eyeSwitch;
  }
  addInfoToast() {
    this._toastService.success(`Welcome back! Dear ${this.userDetail.firstname} ${this.userDetail.lastname}`);
 }
}
