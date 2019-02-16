import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-system-data',
  templateUrl: './system-data.component.html',
  styleUrls: ['./system-data.component.css']
})
export class SystemDataComponent implements OnInit  {

  constructor(private releaseService:ReleasesService,private projectsService:ProjectsService) { }

  releases:any[]=[['Id','Name','Description','Type','Year','Month','Active']];

  projects:any[];

   public releasesTableChart =  {
    chartType: 'Table',
    dataTable: this.releases,
    options: {
      title: 'Releases', 
      allowHtml: true,
      alternatingRowStyle: true,
      pageSize:10,
      width:'100%'      
    }
  };

  public projectsTableChart =  {
    chartType: 'Table',
    dataTable: this.projects,
    options: {
      title: 'Projects', 
      allowHtml: true,
      alternatingRowStyle: true,
      pageSize:10,
      width:'100%'      
    }
  };

  

  ngOnInit() {
    this.loadReleases();
  }
  
  public loadReleases(){
    this.releases=[['Id','Name','Description','Type','Year','Month','Active']];
    this.releaseService.getAll().subscribe(
      releasesResp=>{
        for(let i in releasesResp){
              this.releases.push([
                releasesResp[i].release_id,
                releasesResp[i].release_name,
                releasesResp[i].release_description,
                releasesResp[i].release_type_id, 
                releasesResp[i].year_name+'', 
                releasesResp[i].month_id, 
                releasesResp[i].active]);
        }
        this.releasesTableChart = Object.create(this.releasesTableChart);
        this.releasesTableChart.dataTable = this.releases;
      },
      error=>{
        console.log(error);
      }
    );
  }

  public loadProjects(){
    this.projects=[['Id','Code','Name','Description','Active']];
    this.projectsService.getAll().subscribe(
      projectsResp=>{
        for(let i in projectsResp){
          this.projects.push(
            [projectsResp[i].project_id,
             projectsResp[i].project_code,
             projectsResp[i].project_name,
             projectsResp[i].project_desc,
             projectsResp[i].active]);
        }
        this.projectsTableChart = Object.create(this.projectsTableChart);
        this.projectsTableChart.dataTable = this.projects;
      },
      error=>{
        console.log(error);
      }
    );
  }

 

}
