// sensor-chart.component.ts Inhalt:

import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from '~/app/Models/measurement.model';

@Component({
    selector: 'app-sensor-chart',
    templateUrl: './sensor-chart.component.html',
    styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit {
    @Input() sensorData24Hours: Measurement[];
    @Input() sensorData7Days: Measurement[];
    @Input() sensorData30Days: Measurement[];

    chartDataSource: any[];

    constructor() { }

    ngOnInit(): void {
        this.createChart('24Hours');
    }

    createChart(timePeriod: string): void {
        let dataToDisplay;
        switch (timePeriod) {
            case '24Hours':
                dataToDisplay = this.sensorData24Hours;
                break;
            case '7Days':
                dataToDisplay = this.sensorData7Days;
                break;
            case '30Days':
                dataToDisplay = this.sensorData30Days;
                break;
            default:
                console.error('Ungültiger Zeitraum ausgewählt');
                return;
        }
        this.updateChartWithData(dataToDisplay);
    }

    private updateChartWithData(data: Measurement[]): void {
        this.chartDataSource = data.map(measurement => {
            return {
                category: measurement.timestamp,
                value: measurement.temperature
            };
        });
    }
}
//---------------------------------------------------