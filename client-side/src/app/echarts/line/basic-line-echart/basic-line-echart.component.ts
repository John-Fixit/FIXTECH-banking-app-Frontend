import { Component, OnInit } from '@angular/core';
import { EchartOption } from "echarts"
@Component({
  selector: 'app-basic-line-echart',
  templateUrl: './basic-line-echart.component.html',
  styleUrls: ['./basic-line-echart.component.css']
})
export class BasicLineEchartComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  chartOption: EchartOption={
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis:{
          type: 'value'
      },
      tooltip:{
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params:any)=>{
            return `<b>${params['name']}</b>: $ ${params['value']}`
        }
      },
      series:[{
        data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
        type: 'line',
        areaStyle: {}
      }]
  } 

}
