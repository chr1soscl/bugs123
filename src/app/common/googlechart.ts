import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

export interface GoogleChart{

    getData():any;

    setData(data:any);

    getChart():GoogleChartInterface;

    setChart(chart:GoogleChartInterface);

}