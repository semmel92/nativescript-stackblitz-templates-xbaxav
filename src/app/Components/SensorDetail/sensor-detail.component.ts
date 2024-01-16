// sensor-detail.component.ts Inhalt:

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../Services/backend.service';
import { Sensor } from '~/app/Models/sensor.model';
import { Measurement} from "../../Models/measurement.model";

@Component({
    selector: 'app-sensor-detail',
    templateUrl: './sensor-detail.component.html',
    styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {
    sensor: Sensor;
    lastTenMeasurements: Measurement[];

    constructor(private route: ActivatedRoute, private backendService: BackendService) { }

    ngOnInit(): void {
        const sensorId = this.route.snapshot.params['id'];
        if (sensorId) {
            this.loadSensorDetails(sensorId);
        }
    }

    private loadSensorDetails(sensorId: number) {
        this.backendService.getSensor(sensorId).subscribe(sensorData => {
            this.sensor = sensorData;
            this.lastTenMeasurements = this.sensor.measurements.slice(-10);
        });
    }
}
//---------------------------------------------------