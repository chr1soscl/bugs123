import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { PhasesService } from '../services/phases.service';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Defects', 'Number of Defects'],
      ['Critical', 3],
      ['High', 5],
      ['Medium', 12],
      ['Low',  6]     
    ],
    //opt_firstRowIsData: true,
    options: {
      title: 'Criticallity',
      height: 600,
      legend:{position: 'bottom'}
    },
  };

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Defects', 'Number of Defects'],
      ['High', 4],
      ['Medium', 12],
      ['Low',  6],
      ['Critical', 5]    
    ],
    //opt_firstRowIsData: true,
    options: {
      title: 'Criticallity',
      height: 600
    },
  };

  public stackedChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
       'Western', 'Literature', { role: 'annotation' } ],
      ['2010', 10, 24, 20, 32, 18, 5, ''],
      ['2020', 16, 22, 23, 30, 16, 9, ''],
      ['2030', 28, 19, 29, 30, 12, 13, '']
    ],
    //opt_firstRowIsData: true,
    options: {
      height: 600,
      legend: { position: 'top', maxLines: 5},
      bar: { groupWidth: '50%' },
      isStacked: 'percent',
      backgroundColor:'white'
    },
  };

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
    formatters: [
      {
        columns: [1, 2],
        type: 'NumberFormat',
        options: {
          prefix: '&euro;', negativeColor: 'red', negativeParens: true
        }
      },
      {
        columns: [3],
        type: 'ColorFormat',
        options: {
          ranges: [
            {from: 100, to: 900, fromBgColor: 'green', toBgColor: 'yellow'}
          ]
        }
      }
    ],
    options: {title: 'Countries', allowHtml: true}
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
