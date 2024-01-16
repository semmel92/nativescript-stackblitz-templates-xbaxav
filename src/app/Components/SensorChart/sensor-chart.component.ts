// sensor-chart.component.ts Inhalt:

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-sensor-chart',
    templateUrl: './sensor-chart.component.html',
    styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit {
    @Input() sensorData: any[];

    constructor() { }

    ngOnInit(): void {

    }

    createChart(): void {
    }
}
//---------------------------------------------------