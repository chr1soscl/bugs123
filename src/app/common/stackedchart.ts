import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { GoogleChart } from './googlechart';

export class StackedChart implements GoogleChart{
   
    private data:any;
    private chart:GoogleChartInterface;

    constructor(data:any,title:string){
        this.data=data;
        this.chart = {
            chartType: 'ColumnChart',
            dataTable: this.data,
            //opt_firstRowIsData: true,
            options: {
                title: title,
                height: 600,
                legend: { position: 'top', maxLines: 5},
                bar: { groupWidth: '50%' },
                isStacked: 'percent',
                backgroundColor:'white'
                 }
            };
    }

    public getData():any{
        return this.data;
    }

    public setData(data:any){
        this.data=data;
    }

    public getChart():GoogleChartInterface{
        return this.chart;
    }

    public setChart(chart:GoogleChartInterface){
        this.chart=chart;
    }

}