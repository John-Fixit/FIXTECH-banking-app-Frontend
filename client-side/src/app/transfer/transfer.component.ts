
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser as userIcon, faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from '../services/transaction.service';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  public icons = {userIcon, searchIcon}
  public allUsers: any = [];
  public recipientDetail:any = {}
  public beneficiary_accNumber:string = ""
  public amtToTransfer: string = ""
  public hide_show_amt: boolean = false
  public message: any = ""

  public showHideAmtError = false
  public errStatus: any = undefined;
  public amtErrStatus: any = undefined
  public confirmTransferErr: any = undefined
  public confirmTransferMessage: string = ""
  public amtMessage: any = ""

  public thisUser:any = {}

  constructor(
    private _userService: UsersService,
    private _transactionService : TransactionService,
    private _router: Router,
    private _http : HttpClient

  ) { 
  
  }

  ngOnInit(): void {
      this._userService.getUsers().subscribe((res)=>{
        this.allUsers = res.allUsers
        console.log(this.allUsers);
      }, error=>{
        console.log(error);
      })

      this._userService.authorizeUser().subscribe((res)=>{
          this.thisUser = res.userDetail
      }, (err)=>{
        console.log(err);
      })
  }

  beneficiary_continue(){
    if(this.beneficiary_accNumber !=""){
      let bUser = this.allUsers.find((user: any)=>user.accountNumber == this.beneficiary_accNumber)
      if(bUser){
        if(bUser.accountNumber == this.thisUser.accountNumber){
          this.errStatus = true
          this.message = "Ooh sorry! you cannot transfer to your own account!"
        }
        else{
          this.errStatus = false
          this.recipientDetail = bUser
        }
      }
      else{
        this.errStatus = true
        this.message = "account number entered is not correct please check and try again!"
      }
    }
    else{
        this.errStatus = true
        this.message = "please enter the beneficiary account number before you continue!"
    }
  }

  addAmount(){
      if(this.amtToTransfer != ""){
          this.showHideAmtError = false
      }
      else{
        this.showHideAmtError = true
        this.amtMessage = "please enter the amount to transfer!"
      }
  }

  addText($event:any){
      this.amtToTransfer = $event.target.value; 
      if(this.amtToTransfer != ""){
        this.amtErrStatus = false
      }  
      else{
        this.amtErrStatus = true
      }
  }

  confirmTransfer(){
      let currentUserBalance = this.thisUser.totalBalance
      
      if(currentUserBalance < this.amtToTransfer){
        this.confirmTransferErr = true
        this.confirmTransferMessage = "Your account balance is insufficient to complete the transaction!"
      }
      else{
          let senderTransactionDetail = {type: 'debit', recipient: `${this.recipientDetail.firstname} ${this.recipientDetail.lastname}`, recipientAccountNumber: this.recipientDetail.accountNumber, timeStamp: new Date(), transactionName: 'transfer', amount: parseInt(this.amtToTransfer)};
          
          let recipientTransactionDetail = {type: 'credit', sender: `${this.thisUser.firstname} ${this.thisUser.lastname}`, recipientAccountNumber: this.recipientDetail.accountNumber, timeStamp: new Date(), transactionName: 'recieved', amount: parseInt(this.amtToTransfer)};

          let transferDetail = {senderId: this.thisUser._id, recipientId: this.recipientDetail._id, amount: this.amtToTransfer, senderTransactionDetail, recipientTransactionDetail}

          this._transactionService.transferFunc(transferDetail).subscribe((res:any)=>{
            if(res.status){
                this.confirmTransferErr = false;
                this.confirmTransferMessage = res.message;
                this.beneficiary_accNumber = "";
                this.errStatus = undefined
            }
            else{
              this.confirmTransferErr = true;
              this.confirmTransferMessage = res.message;
            }
          }, (err)=>{
            console.log(err);
          })
          
      }
  }


  sideNavStatus : boolean = false

}


