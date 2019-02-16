import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { PhasesService } from '../services/phases.service';

import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { GoogleChart } from '../common/googlechart';
import { ChartFactory } from '../common/chartfactory';
import { CriticalityChartService } from '../services/chart-services/criticality-chart.service';
import { ColumnChart } from '../common/columnchart';
import { PhaseChartService } from '../services/chart-services/phase-chart.service';
import { RcaChartService } from '../services/chart-services/rca-chart.service';
import { RcaProjectChartService } from '../services/chart-services/rca-project-chart.service';
import { ProjectRcaChartService } from '../services/chart-services/project-rca-chart.service';



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
     {id:'release',label:'Release',type:'dropdown',
      options:this.releases},
      {id:'phase',label:'Testing Phase',type:'dropdown',
      options:this.phases},
     {label:'Graph',type:'button'},
     {label:'Clean',type:'reset'}
   ];

  constructor(private releaseService:ReleasesService, 
              private phasesService:PhasesService,
              private criticalityChartService:CriticalityChartService,
              private phaseChartService:PhaseChartService,
              private rcaChartService:RcaChartService,
              private rcaProjectChartService:RcaProjectChartService,
              private projectRcaChartService:ProjectRcaChartService) { }

  ngOnInit() {

    this.loadLeftCriticalityChartTab();
    this.loadRightRCAChartTab();
  
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

  loadCriticalityChart(){
   return ChartFactory.getChartInstance('columnChart',
    this.criticalityChart,
    'Criticality'
    ).getChart();
  }

  loadPhaseChart(){
    return ChartFactory.getChartInstance('columnChart',
     this.phaseChart,
     'Phase'
     ).getChart();
   }

  loadRCAChart(){
    return ChartFactory.getChartInstance('pieChart',
    this.rcaChart,
    'Root Cause Analysis'
    ).getChart();
  }

  loadRCAProjectChart(){
    return ChartFactory.getChartInstance('stackedChart',
     this.rcaProjectChart,
    'RCA Project'
    ).getChart();
  }

  loadProjectRCAChart(){
    return ChartFactory.getChartInstance('stackedChart',
     this.projectRcaChart,
    'Project RCA'
    ).getChart();
  }

  loadLeftCriticalityChartTab(){
    let criticalityChart=this.loadCriticalityChart();
    this.activeLeftPane=1;
    console.log("loadLeftColumnChartTab>columnChart>",criticalityChart);
    this.criticalityChartService.getObject(this.chartRequest).subscribe(data=>{
      this.criticalityChart = Object.create(criticalityChart);
      this.criticalityChart.dataTable = data;
      this.generalLeftPane=this.criticalityChart;
    },error=>{
       console.log(error);
    });
    
  }

  loadLeftPhaseChartTab(){
    let phaseChart=this.loadPhaseChart();
    this.activeLeftPane=2;
    console.log("loadLeftPhaseChartTab>columnChart>",phaseChart);
    this.phaseChartService.getObject(this.chartRequest).subscribe(data=>{
      this.phaseChart = Object.create(phaseChart);
      this.phaseChart.dataTable = data;
      this.generalLeftPane=this.phaseChart;
    },error=>{
       console.log(error);
    });
  }

  loadRightRCAChartTab(){
    let rcaChart=this.loadRCAChart();
    this.activeRightPane=1;
    console.log("loadRightRCAChartTab>rcaChart>",rcaChart);
    this.rcaChartService.getObject(this.chartRequest).subscribe(data=>{
      this.rcaChart = Object.create(rcaChart);
      this.rcaChart.dataTable = data;
      this.generalRightPane=this.rcaChart;
    },error=>{
       console.log(error);
    });
  }

  loadRightRCAProjectChartTab(){
    let rcaProjectChart=this.loadRCAProjectChart();
    this.activeRightPane=2;
    console.log("loadRightRCAProjectChartTab>rcaProjectChart>",rcaProjectChart);
    this.rcaProjectChartService.getObject(this.chartRequest).subscribe(data=>{
      this.rcaProjectChart = Object.create(rcaProjectChart);
      this.rcaProjectChart.dataTable = data;
      this.generalRightPane=this.rcaProjectChart;
    },error=>{
       console.log(error);
    });
  }

  loadRightProjectRCAChartTab(){
    let projectRcaChart=this.loadProjectRCAChart();
    this.activeRightPane=3;
    console.log("loadRightProjectRCAChartTab>rcaProjectChart>",projectRcaChart);
    this.projectRcaChartService.getObject(this.chartRequest).subscribe(data=>{
      this.projectRcaChart = Object.create(projectRcaChart);
      this.projectRcaChart.dataTable = data;
      this.generalRightPane=this.projectRcaChart;
    },error=>{
       console.log(error);
    });
  }

  onClick(event):void{
    console.log('onClick',event);
    this.chartRequest.release=event.release;
    this.chartRequest.phase=event.phase;
    console.log("onClick>chartRequest>",this.chartRequest);
    if(this.activeLeftPane===1)
      this.loadLeftCriticalityChartTab();
    if(this.activeLeftPane===2)
      this.loadLeftPhaseChartTab();
    if(this.activeRightPane===1)
      this.loadRightRCAChartTab();
    if(this.activeRightPane===2)
      this.loadRightRCAProjectChartTab();
    if(this.activeRightPane===3)
      this.loadRightProjectRCAChartTab();
  }

}
