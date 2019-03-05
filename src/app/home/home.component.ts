import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   dataResults:any;
   columns=["name","username","email","phone","website"];

   formFields:any[]=[
    {id:'id',label:'Id',type:'text',validators:['required','max|10']},
     {label:'Search',type:'button'},
     {label:'Clean',type:'reset'}
   ];

   formFields2:any[]=[
     [
      {id:'id',label:'Id',type:'text',validators:['required','max|10']},
      {id:'fName',label:this.translate.instant('Homepage.first-name'),type:'text'},
      {id:'lName',label:this.translate.instant('Homepage.last-name'),type:'text'},
      {id:'dob',label:this.translate.instant('Homepage.dob'),type:'date'}
     ],
     [
      {id:'aLine1',label:'Address Line',type:'text'},
      {id:'aLine2',label:'Address Line 2',type:'text'},
      {id:'zip',label:'Zip Code',type:'text'},
      {id:'city',label:'City',type:'text'},
      {id:'state',label:'State',type:'text'},
     ],
     [
        {label:this.translate.instant('Navigationpage.search'),type:'button'},
        {label:this.translate.instant('Homepage.clear'),type:'reset'}
     ]
   ];

  constructor(private userService:UsersService,
              private translate:TranslateService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data=>{
        console.log(data);
        this.dataResults=data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  onClick(event):void{
    console.log('onClick',event.id);
    this.userService.getId(event.id).subscribe(
      data=>{
        this.dataResults=[];
        this.dataResults.push(data);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
