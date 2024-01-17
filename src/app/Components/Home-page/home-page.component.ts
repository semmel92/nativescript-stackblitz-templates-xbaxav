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
        this.loadSensors();
        this.loadLatestMeasurements();
    }

    showSensors() {
        this.router.navigate(['/sensors']);
    }

    navigateToSensorDetails(sensorId: number) {
        this.router.navigate(['/sensor-detail', sensorId]);
    }

    private loadSensors() {
        this.backendService.getSensors(0, 10).subscribe(response => {
            this.sensors = response.content;
        }, error => {
            console.error('Fehler beim Abrufen der Sensoren:', error);
        });
    }

    private loadLatestMeasurements() {
        this.backendService.getLatestMeasurements().subscribe(measurements => {
            this.latestMeasurements = measurements;
        }, error => {
            console.error('Fehler beim Abrufen der neuesten Messwerte:', error);
        });
    }
}
//---------------------------------------------------