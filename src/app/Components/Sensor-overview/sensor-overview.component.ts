// sensor-overview.component.ts Inhalt:

import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Sensor } from '~/app/Models/sensor.model';
import { Router } from '@angular/router';

@Component({
    selector: 'ns-sensor-overview',
    templateUrl: './sensor-overview.component.html',
})
export class SensorOverviewComponent implements OnInit {
    sensors: Sensor[] = [];
    showSensorList = false;
    isLoading = true;

    constructor(private backendService: BackendService, private router: Router) {}

    ngOnInit(): void {
        this.backendService.getSensors(0, 10).subscribe(
            response => {
                this.sensors = response.content;
                this.isLoading = false;
            },
            error => {
                console.error('Fehler beim Abrufen der Sensoren:', error);
                this.isLoading = false;
            }
        );
    }

    showChart(sensorId: number) {
        this.router.navigate(['/sensor-detail', sensorId]);
    }

    navigateToSensorDetails(sensorId: number) {
        this.router.navigate(['/sensor-detail', sensorId]);
    }
}
//---------------------------------------------------