import { DataSource } from '@angular/cdk/collections';
import { MatPaginator,MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { CompileMetadataResolver } from '@angular/compiler';

export class NgxDataTableDataSource extends DataSource<any> {

    public data: any[];
    constructor(private paginator:MatPaginator, private _data:any[], private sort:MatSort){
        super();
        this.data = _data;
    }

    connect(): Observable<any[]>{
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];

        this.paginator.length = this.data.length;

        return merge(...dataMutations).pipe(map(()=>{
            return this.getPagedData(this.getSortedData([...this._data]));
        }));
    }

    disconnect(){}

    private getPagedData(data:any[]){
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    private getSortedData(data:any[]){
        if(!this.sort.active || this.sort.direction === ''){
            return data;
        }

        return data.sort((a,b)=>{
            const isAsc = this.sort.direction ==='asc';
            if (isNaN(a[this.sort.active])){
                return compare(a[this.sort.active],b[this.sort.active],isAsc);
            }else{
                return compare(+a[this.sort.active],+b[this.sort.active],isAsc);
            }
        });
    }
}

function compare(a, b, isAsc){
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}