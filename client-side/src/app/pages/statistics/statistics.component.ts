import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { LineChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { StatisticService } from 'src/app/services/statistic.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    public userDetail: any = undefined
    public credit:any = 0
    public debit:any = 0
    private creditData:any = []
    private debitData:any = []
    readonly echartsExtensions:any []
    public echartOptions = {}
  constructor(
    private userService: UsersService,
    private _statDataService: StatisticService
  ) { 
    this.echartsExtensions = [LineChart, TooltipComponent, GridComponent, LegendComponent]
  }

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
    let creditData:any = []
    let debitData:any = []
    let months:any = []
    this._statDataService.getMonthlyTransactionStat().subscribe((data:any)=>{
      data.creditData.map((item:any)=>{
        creditData.push(item.amount)
        months.push(item.name)
      })
      data.debitData.map((item:any)=>{
        debitData.push(item.amount)
      })

      this.echartOptions
     = {
        tooltip:{
          trigger: "axis",
          axisPointer: {
            type: "shadow"
            }
        },
        grid:{
          left: "4%",
          right: "4%",
          bottom: "8%",
          top: "10%",
          containLabel: true
          
        },
        xAxis: {
          type: "category",
          data: months,
          axisLabel: {
          interval: 0,
          rotate: 15,
          } 

        },
        yAxis:{
          type: "value",
          axisLabel: {
            interval: 0,
            rotate: 15
            } 
        },
        legend:{
          data: ["Credit($)", "Debit($)"],
          top: 5
        },
        series: [
          {
              name: "Credit($)",
              type: "line",
              data: creditData,
          },
          {
              name: "Debit($)",
              type: "line",
              data: debitData,
          }
          ]
     }
  })
  

    
     
  }

}
