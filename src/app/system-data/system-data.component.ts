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
        releasesResp.forEach(element => {
              this.releases.push([element.release_id,
                                  element.release_name,
                                  element.release_description,
                                  element.release_type_id, 
                                  element.year_name+'', 
                                  element.month_id, 
                                  element.active]);
        });
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
        projectsResp.forEach(element => {
              this.projects.push([element.project_id,
                                  element.project_code,
                                  element.project_name,
                                  element.project_desc,
                                  element.active]);
        });
        console.log(this.projects);
        this.projectsTableChart = Object.create(this.projectsTableChart);
        this.projectsTableChart.dataTable = this.projects;
      },
      error=>{
        console.log(error);
      }
    );
  }

 

}
