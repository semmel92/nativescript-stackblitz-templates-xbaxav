// sensor-overview.component.ts Inhalt:

import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Sensor } from '~/app/Models/sensor.model';

@Component({
  selector: 'ns-sensor-overview',
  templateUrl: './sensor-overview.component.html',
})
export class SensorOverviewComponent implements OnInit {
  sensors: Sensor[] = [];
  showSensorList = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getSensors().subscribe(
      response => {
        console.log('Empfangene Antwort:', response);
        this.sensors = response.content;
        console.log('Sensoren:', this.sensors);
      },
      error => {
        console.error('Fehler beim Abrufen der Sensoren:', error);
      }
    );
  }
  

  onSensorTouch() {
    this.showSensorList = true; 
  }
}
//---------------------------------------------------