import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { PhasesService } from '../services/phases.service';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { GoogleChart } from '../common/googlechart';
import { ChartFactory } from '../common/chartfactory';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public columnChart;

  public pieChart;

  public stackedChart;

  public tableChart =  {
    chartType: 'Table',
    dataTable: [
      ['Department', 'Revenues', 'Another column', 'ColorFormat'],
      ['Shoes for everyone who would like to purchase them in a very good day.', 10700, -100, 100],
      ['Sports', -15400, 25, 500],
      ['Toys', 12500, 40, 800],
      ['Electronics', -2100, 889, 1000],
      ['Food', 22600, 78, 1100],
      ['Art', 1100, 42, 400]
    ],
    options: {
      title: 'Releases', 
      allowHtml: true,
      alternatingRowStyle: true,
      pageSize:10,
      width:'100%'      
    }
  };

  releases:any[]=[];
  phases:any[]=[];

  formFields:any[]=[
     {id:'release',label:'Release',type:'dropdown',
      options:this.releases},
      {id:'phase',label:'Testing Phase',type:'dropdown',
      options:this.phases},
     {label:'Graph',type:'button'},
     {label:'Clean',type:'reset'}
   ];

  constructor(private releaseService:ReleasesService, private phasesService:PhasesService) { }

  ngOnInit() {

    this.columnChart = ChartFactory.getChartInstance('columnChart',
    [
    ['Defects', 'Number of Defects'],
    ['Critical', 3],
    ['High', 5],
    ['Medium', 12],
    ['Low',  6]     
    ],
    'Criticality title'
    ).getChart();

    this.pieChart = ChartFactory.getChartInstance('pieChart',
    [
    ['Defects', 'Number of Defects'],
    ['High', 4],
    ['Medium', 12],
    ['Low',  6],
    ['Critical', 5],
    ['Invalid', 7],
    ['Closed', 15]    
    ],
    'Root Cause Analysis'
    ).getChart();

    this.stackedChart = ChartFactory.getChartInstance('stackedChart',
    [
      ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
       'Western', 'Literature', { role: 'annotation' } ],
      ['2010', 10, 24, 20, 32, 18, 5, ''],
      ['2020', 16, 22, 23, 30, 16, 9, ''],
      ['2030', 28, 19, 29, 30, 12, 13, '']
    ],
    'RCA Project'
    ).getChart();
  
  

    this.releaseService.getAll().subscribe(
      releases=>{
        releases.forEach(element => {
          if(element.active===1)
              this.releases.push({id:element.release_id,label:element.release_name});
        });
      },
      error=>{
        console.log(error);
      }
    );

    this.phasesService.getAll().subscribe(
      phases=>{
        phases.forEach(element=>{
          if(element.active===1)
              this.phases.push({id:element.phase_id,label:element.phase_name});
        });
      },
      error=>{
        console.log(error);
      }
    );
  }

  onClick(event):void{
    console.log('onClick',event);
  }

}
