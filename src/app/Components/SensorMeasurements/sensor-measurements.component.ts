// sensor-measurement.component.ts Inhalt:

import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Measurement } from '~/app/Models/measurement.model';

@Component({
    selector: 'app-sensor-measurements',
    templateUrl: './sensor-measurements.component.html',
    styleUrls: ['./sensor-measurements.component.css']
})
export class SensorMeasurementsComponent implements OnInit {
    @Input() sensorId: number;
    measurements24Hours: Measurement[];
    measurements7Days: Measurement[];
    measurements30Days: Measurement[];

    constructor(private backendService: BackendService) { }

    ngOnInit(): void {
        this.loadTemperatureData();
    }
    private loadTemperatureData() {
        this.backendService.getMeasurementsFromSensorForPeriod(this.sensorId, '24hours').subscribe(data => {
            this.measurements24Hours = data;
        });

        this.backendService.getMeasurementsFromSensorForPeriod(this.sensorId, '7days').subscribe(data => {
            this.measurements7Days = data;
        });

        this.backendService.getMeasurementsFromSensorForPeriod(this.sensorId, '30days').subscribe(data => {
            this.measurements30Days = data;
        });
    }
}
//---------------------------------------------------