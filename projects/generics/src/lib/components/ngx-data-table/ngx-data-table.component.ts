import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { NgxDataTableDataSource } from './ngx-data-table-datasource';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-data-table',
    templateUrl: './ngx-data-table.component.html',
    styleUrls: ['./ngx-data-table.component.css']
})
export class NgxDataTableComponent{
   
    id:String;

    @Input() columns:any[];
    @Input() route:string;
    @Input() IdColumn:string;

    @Input() set data(_data: any[]){
        if(_data===undefined)
        _data=[{}];
        this.dataSource = new NgxDataTableDataSource(this.paginator, _data, this.sort);
        if(this.columns===undefined)
            this.displayedColumns = Object.keys(_data[0]);
        else
            this.displayedColumns = this.columns;
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: NgxDataTableDataSource;

    displayedColumns: Array<string>;

    constructor(public router:Router){}
    
    onClick(id:string){
        console.log('DataTable.onClick()=',id,this.route);
        this.id=id;
        this.router.navigate(['/'+this.route,id]);
    }
}