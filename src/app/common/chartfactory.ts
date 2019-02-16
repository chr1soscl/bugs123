import { ColumnChart } from './columnchart';
import { GoogleChart } from './googlechart';
import { PieChart } from './pierchart';
import { StackedChart } from './stackedchart';

export class ChartFactory{

    public static getChartInstance(type:string,data:any,title:string):GoogleChart{
        if(type==='columnChart'){ 
            return new ColumnChart(data,title); 
        } else
        if(type==='pieChart'){
            return new PieChart(data,title);
        } else
        if(type==='stackedChart'){
            return new StackedChart(data,title);
        }
            
    }

}