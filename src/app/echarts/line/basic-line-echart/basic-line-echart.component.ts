import { Component, OnInit } from '@angular/core';
import { LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
@Component({
  selector: 'app-basic-line-echart',
  templateUrl: './basic-line-echart.component.html',
  styleUrls: ['./basic-line-echart.component.css']
})
export class BasicLineEchartComponent implements OnInit {
  readonly echartsExtentions: any[];
  echartsOptions: any = {};
  constructor() { 
    this.echartsExtentions = [LineChart, TooltipComponent, GridComponent, LegendComponent];
  }

  ngOnInit(): void {

    this.echartsOptions = {
      tooltip: {
          trigger: "axis",
          axisPointer: {
          type: "shadow"
          }
      },
      grid: {
          left: "10%",
          right: "4%",
          bottom: "8%",
          top: "10%",
          containLabel: true
      },
      xAxis: {
        type: "category",
          data:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisLabel: {
          interval: 0,
          rotate: 15,
          } 
      },
      yAxis: {
        type: "value",
        axisLabel: {
          interval: 0,
          rotate: 15
          } 
      },
      legend: {
          data: ["Credit", "Debit"],
          top: 5
      },
      series: [
      {
          name: "Credit",
          type: "line",
          data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      },
      {
          name: "Debit",
          type: "line",
          data: [320, 432, 501, 634, 1290, 1330, 1450, 1500, 1750, 1450, 1280, 1690],
      }
      ]
  };
}

  }

