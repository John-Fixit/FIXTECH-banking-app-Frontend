
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser as userIcon, faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'angular-toastify';
import { environment } from 'src/environments/environment';
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
  private baseUrl = environment.url
  public errStatus: any = undefined;
  public amtErrStatus: any = undefined
  public confirmTransferErr: any = undefined
  public confirmTransferMessage: string = ""
  public amtMessage: any = ""
  public pin = ""

  public thisUser:any = {}

  public isLoading = false
  public confirmTransferLoading = false
  disableBtn = true
  disableTransferBtn = true
  constructor(
    private _userService: UsersService,
    private _transactionService : TransactionService,
    private _router: Router,
    private _http : HttpClient,
    private _toastService: ToastService

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
      this.isLoading = true
      this._http.get(`${this.baseUrl}/checkUser/${this.beneficiary_accNumber}`).subscribe((res:any)=>{
        this.isLoading = false
        if(res.status){
          if(res.user.accountNumber == this.thisUser.accountNumber){
              this.errStatus = true
              this.message = "Ooh sorry! you cannot transfer to your own account!"
          }
          else{
            this.errStatus = false
            this.recipientDetail = res.user
          }
        }
        else{
          this.errStatus = true
          this.message = res.message
        }
      })
    }
    else{
        this.errStatus = true
        this.message = "please enter the beneficiary account number before you continue!"
    }
  }


  addText($event:any){
      this.amtToTransfer = $event.target.value; 
      if(parseInt($event.target.value) >=50){
        this.disableBtn = false
      }
      else{
        this.disableBtn = true
      }
  }
  enterPin($event:any){
      this.pin = $event.target.value
      if($event.target.value != ""){
        this.disableTransferBtn = false
      }
      else{
        this.disableTransferBtn = true
      }
  }

  confirmTransfer(){
      let currentUserBalance = this.thisUser.totalBalance
      
      if(currentUserBalance < this.amtToTransfer){
        this.confirmTransferErr = true
        this.confirmTransferMessage = "Your account balance is insufficient to complete the transaction!"
      }
      else{
        this.confirmTransferLoading = true
          let senderTransactionDetail = {type: 'debit', recipient: `${this.recipientDetail.firstname} ${this.recipientDetail.lastname}`, recipientAccountNumber: this.recipientDetail.accountNumber, timeStamp: new Date(), transactionMethod: 'transfer', amount: parseInt(this.amtToTransfer)};
          
          let recipientTransactionDetail = {type: 'credit', sender: `${this.thisUser.firstname} ${this.thisUser.lastname}`, senderAccountNumber: this.thisUser.accountNumber, timeStamp: new Date(), transactionMethod: 'recieved', amount: parseInt(this.amtToTransfer)};

          let transferDetail = {senderId: this.thisUser._id, recipientId: this.recipientDetail._id, amount: this.amtToTransfer, senderTransactionDetail, recipientTransactionDetail, password: this.pin}

          this._transactionService.transferFunc(transferDetail).subscribe((res:any)=>{
            this.confirmTransferLoading = false
            if(res.status){
                this._toastService.success(res.message)
                this.beneficiary_accNumber = "";
                this.pin = ""
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


