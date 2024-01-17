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
    navigateToSensorDetails(sensorId: number): void {
        this.router.navigate(['/sensor-detail', sensorId]);
    }
    getLatestMeasurements(measurements: Measurement[]): Measurement[] {
        if (measurements && measurements.length) {
            return measurements.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 1);
        }
        return [];
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
                if (measurements && measurements.length > 0) {
                    const measurementsWithTimestamps = measurements.map(measurement => ({
                        ...measurement,
                        timestamp: new Date(measurement.timestamp)
                    }));

                    const latestMeasurements = measurementsWithTimestamps.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

                    sensor.measurements = latestMeasurements;
                }
            }, error => {
                console.error(`Fehler beim Abrufen der Messungen für Sensor ${sensor.sensorId}:`, error);
            });
        });
    }


    showSensors(): void {
        this.router.navigate(['/sensors']);
    }
}
//---------------------------------------------------