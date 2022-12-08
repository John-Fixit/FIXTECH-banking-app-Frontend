import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    public userDetail: any = undefined
    public credit:any = 0
    public debit:any = 0
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.userService.authorizeUser().subscribe((res)=>{
      this.userDetail = res.userDetail

      this.userDetail.transactionType.map((item:any)=>{
          if(item.type == 'debit'){
              this.debit += parseInt(item.amount)
          }
          if(item.type == 'credit'){
            this.credit += parseInt(item.amount)
          }
      })

    })

  }

}
