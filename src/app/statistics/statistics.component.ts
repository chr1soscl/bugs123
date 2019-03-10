import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { PhasesService } from '../services/phases.service';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartFactory } from '../common/chartfactory';
import { CriticalityChartService } from '../services/chart-services/criticality-chart.service';
import { PhaseChartService } from '../services/chart-services/phase-chart.service';
import { RcaChartService } from '../services/chart-services/rca-chart.service';
import { RcaProjectChartService } from '../services/chart-services/rca-project-chart.service';
import { ProjectRcaChartService } from '../services/chart-services/project-rca-chart.service';
import { DataService } from 'projects/generics/src/public_api';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public generalLeftPane;
  public generalRightPane;
  public criticalityChart;
  public phaseChart;
  public rcaChart;
  public rcaProjectChart;
  public projectRcaChart;
  public activeLeftPane=1;
  public activeRightPane=1;

  chartRequest={
    release:null,
    phase:null
  };

  
  releases:any[]=[];
  phases:any[]=[];

  formFields:any[]=[
     {id:'release',label:this.translate.instant('Statisticspage.release'),type:'dropdown',
      options:this.releases},
      {id:'phase',label:this.translate.instant('Statisticspage.testing-phase'),type:'dropdown',
      options:this.phases},
     {label:this.translate.instant('Statisticspage.paint'),type:'button'},
     {label:this.translate.instant('Statisticspage.clear'),type:'reset'}
   ];

  constructor(private releaseService:ReleasesService, 
              private phasesService:PhasesService,
              public criticalityChartService:CriticalityChartService,
              public phaseChartService:PhaseChartService,
              public rcaChartService:RcaChartService,
              public rcaProjectChartService:RcaProjectChartService,
              public projectRcaChartService:ProjectRcaChartService,
              private translate:TranslateService) { }

  ngOnInit() {

    this.loadChartTab('left','criticality','Criticality',1,this.criticalityChartService);
    this.loadChartTab('right','rca','Root Cause Analysis',1,this.rcaChartService);
  
    this.releaseService.getAll().subscribe(
      releases=>{
        for(let i in releases){
          if(releases[i].active===1)
              this.releases.push({id:releases[i].release_id,label:releases[i].release_name});
        }
      },
      error=>{
        console.log(error);
      }
    );

    this.phasesService.getAll().subscribe(
      phases=>{
        for(let i in phases){
          if(phases[i].active===1)
              this.phases.push({id:phases[i].phase_id,label:phases[i].phase_name});
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  loadCriticalityChart(title:string){
   return ChartFactory.getChartInstance('columnChart',
    this.criticalityChart,
    title
    ).getChart();
  }

  loadPhaseChart(title:string){
    return ChartFactory.getChartInstance('columnChart',
     this.phaseChart,
     title
     ).getChart();
   }

  loadRCAChart(title:string){
    return ChartFactory.getChartInstance('pieChart',
    this.rcaChart,
    title
    ).getChart();
  }

  loadRCAProjectChart(title:string){
    return ChartFactory.getChartInstance('stackedChart',
     this.rcaProjectChart,
     title
    ).getChart();
  }

  loadProjectRCAChart(title:string){
    return ChartFactory.getChartInstance('stackedChart',
     this.projectRcaChart,
     title
    ).getChart();
  }

  loadChart(name:string,title:string):GoogleChartInterface{
    if(name==='criticality')
        return this.loadCriticalityChart(title);
    else if(name==='phase')
        return this.loadPhaseChart(title);
    else if(name==='rca')
        return this.loadRCAChart(title);
    else if(name==='rcaproject')
        return this.loadRCAProjectChart(title);
    else if(name==='projectrca')
        return this.loadProjectRCAChart(title);
  }

  setGeneralPane(side:string,chart:GoogleChartInterface){
    if(side==='left')
      this.generalLeftPane=chart;
    else if(side==='right')
      this.generalRightPane=chart;
  }

  setActivePane(side:string,number:number){
    if(side==='left'){
      this.activeLeftPane=number;
    }
    else if(side==='right'){
      this.activeRightPane=number;
    }
  }

  loadChartTab(side:string,
               chartName:string,
               chartTitle:string,
               chartNumber:number,
               dataService:DataService){
    let chart=this.loadChart(chartName,chartTitle);
    this.setActivePane(side,chartNumber);
    dataService.getObject(this.chartRequest).subscribe(
      data=>{
            chart = Object.create(chart);
            chart.dataTable = data;
            this.setGeneralPane(side,chart);
      },
      error=>{
        console.log(error);
      }
    );
  }

  

  onClick(event):void{
    console.log('onClick',event);
    this.chartRequest.release=event.release;
    this.chartRequest.phase=event.phase;
    console.log("onClick>chartRequest>",this.chartRequest);
    
    if(this.activeLeftPane===1)
      this.loadChartTab('left','criticality','Criticality',1,this.criticalityChartService);
    else if(this.activeLeftPane===2)
      this.loadChartTab('left','phase','Phase',2,this.phaseChartService);
    
    if(this.activeRightPane===1)
      this.loadChartTab('right','rca','Root Cause Analysis',1,this.rcaChartService);
    else if(this.activeRightPane===2)
      this.loadChartTab('right','rcaproject','RCA Project',2,this.rcaProjectChartService);
    else if(this.activeRightPane===3)
      this.loadChartTab('right','projectrca','Project RCA',3,this.projectRcaChartService);
  }

}
