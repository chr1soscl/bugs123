import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService} from './../../services/data.service'

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchCriteria: any[];

  @Input() columns:any[];
  @Input() routeForTable:string;
  @Input() dataService:DataService;

  searchCriteriaValues:any[];
  id:string;
  data:any[]=[{}];

  constructor() { }

  ngOnInit() {
  }

  onSearchClicked(event):void{
    console.log('onSearchClicked',event);
    this.searchCriteriaValues=event;
    this.dataService.getObject(event)
    .subscribe(
      data=>{
        this.data=[];
        this.data.push(data);
      }
    );
  }
}
