import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

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
     {id:'name',label:'Name',type:'text'},
     {id:'user',label:'User',type:'text'},
     {label:'Look up',type:'button'},
     {label:'Clean',type:'reset'}
   ];

  constructor(private userService:UsersService) { }

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
