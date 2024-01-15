import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';

@Component({
  selector: 'ns-sensor-overview',
  templateUrl: './sensor-overview.component.html',
})
export class SensorOverviewComponent implements OnInit {
  sensors: any[] = [];
  showSensorList = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getSensors().subscribe(data => {
        this.sensors = data;
        });
        }
        
        onSensorTouch() {
        this.showSensorList = true; 
        }
        }