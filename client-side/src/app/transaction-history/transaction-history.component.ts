import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  public sideNavStatus:boolean = false
  public creditTransaction:any = [];
  public debitTransaction:any = [];
  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
      this._userService.authorizeUser().subscribe((res:any)=>{
          this.creditTransaction = res.userDetail.transactionType.filter((item:any)=>item.type == "credit")
          this.debitTransaction = res.userDetail.transactionType.filter((item:any)=>item.type == "debit")
          console.log(this.debitTransaction);
      })


  }

}
