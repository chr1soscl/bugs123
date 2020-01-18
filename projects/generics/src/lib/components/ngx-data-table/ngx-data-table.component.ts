import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { NgxDataTableDataSource } from './ngx-data-table-datasource';
import { Router } from '@angular/router';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Constants } from '../../common/constants/constants';

@Component({
    selector: 'ngx-data-table',
    templateUrl: './ngx-data-table.component.html',
    styleUrls: ['./ngx-data-table.component.css']
})
export class NgxDataTableComponent{
   
    id:String;
    previousIndex: number;
    IdColumn: string;

    @Input() columns:any[];
    @Input() route:string;

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
        this.router.navigate([Constants.BACK_SLASH+this.route,id]);
    }

    dragStarted(event: CdkDragStart, index: number ) {
        this.previousIndex = index;
    }
    
    dropListDropped(event: CdkDropList, index: number) {
        if (event) {
          moveItemInArray(this.columns, this.previousIndex, index);
          this.setDisplayedColumns();
        }
    }
    
    setDisplayedColumns() {
        this.columns.forEach(( colunm, index) => {
          this.displayedColumns[index] = colunm;
        });
    }

    getIdColumn(){
        return this.IdColumn;
    }

    setIdColumn(id:string){
        this.IdColumn=id;
    }
    
}