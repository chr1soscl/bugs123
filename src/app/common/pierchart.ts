import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { GoogleChart } from './googlechart';

export class PieChart implements GoogleChart{
   
    private data:any;
    private chart:GoogleChartInterface;

    constructor(data:any,title:string){
        this.data=data;
        this.chart = {
            chartType: 'PieChart',
            dataTable: this.data,
            //opt_firstRowIsData: true,
            options: {
                title: title,
                height: 600
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