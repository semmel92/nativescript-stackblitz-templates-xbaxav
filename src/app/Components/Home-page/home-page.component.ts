// home-page.component.ts Inhalt:

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Sensor } from '~/app/Models/sensor.model';
import { Measurement } from "~/app/Models/measurement.model";

@Component({
    selector: 'ns-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    sensors: Sensor[] = [];
    latestMeasurements: Measurement[] = [];

    constructor(private backendService: BackendService, private router: Router) {}

    ngOnInit(): void {
        this.loadSensorsAndMeasurements(0);
    }

    private loadSensorsAndMeasurements(page: number) {
        this.backendService.getSensors(page, 10).subscribe(response => {
            this.sensors.push(...response.content);

            if (page < Math.ceil(response.totalResults / response.pageSize) - 1) {
                this.loadSensorsAndMeasurements(page + 1);
            } else {
                this.loadMeasurementsForAllSensors();
            }
        }, error => {
            console.error('Fehler beim Abrufen der Sensoren:', error);
        });
    }

    private loadMeasurementsForAllSensors() {
        this.sensors.forEach(sensor => {
            this.backendService.getMeasurementsFromSensor(sensor.sensorId).subscribe(measurements => {
                measurements.forEach(measurement => {
                    measurement.timestamp = new Date(measurement.timestamp);
                });

                this.latestMeasurements.push(...measurements);
                this.latestMeasurements.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                this.latestMeasurements = this.latestMeasurements.slice(0, 10);
            });
        });
    }

    showSensors(): void {
        this.router.navigate(['/sensors']);
    }
}
//---------------------------------------------------