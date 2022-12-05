import { Component, OnInit } from '@angular/core';
import { faMoneyCheck, faMoneyBillTransfer, faIdCardAlt, faMoneyCheckAlt, faGreaterThan as greaterSign, faBank, faCopy, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  sideNavStatus : boolean = false
  greaterSign = greaterSign
  bankIcon = faBank
  copyIcon = faCopy
  userIcon = faUserAlt

  public addMoneyType:any = ""
  public userDetail:any = undefined;
  public amountToFund:number = 0 * 100
  public thisData= [
     {
         icon: faMoneyBillTransfer,
         bold_text: "Bank Transfer",
         light_text: "Add money via mobile or internet banking"
     },
     {
         icon: faMoneyCheck,
         bold_text: "Cash Deposit",
         light_text: "Fund your account with ease"
     },
     {
         icon: faIdCardAlt,
         bold_text: "Top-up with card/Account",
         light_text: "Add money directly from your bank card"
     },
     {
         icon: faMoneyCheckAlt,
         bold_text: "Request Money from Others",
         light_text: "You can change your mobile number"
     },
 ]



  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this._userService.authorizeUser().subscribe((res)=>{
      if(res.status)this.userDetail = res.userDetail
      
    })
  }

modalOutFunc(params:any){
    this.addMoneyType = params.title
    console.log(params);
    
}

paymentCancel(){
  alert('You want to close the payment gate')
}
paymentDone(params:any){
  console.log(params);
  
}
  


}
