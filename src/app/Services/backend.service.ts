//backend.service.ts Inhalt:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../Models/sensor.model';
import { PaginatedResponse } from "~/app/Models/paginated-response.model";
import { Measurement } from '../Models/measurement.model';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private apiUrl = 'http://192.168.178.114:8080/rest-api';

    constructor(private http: HttpClient) {}
    getLatestMeasurements(): Observable<Measurement[]> {
        return this.http.get<Measurement[]>(`${this.apiUrl}/sensors/latestMeasurements`);
    }
    getSensors(page: number, pageSize: number): Observable<PaginatedResponse<Sensor>> {
        return this.http.get<PaginatedResponse<Sensor>>(`${this.apiUrl}/sensors?page=${page}&size=${pageSize}`);
    }

    getSensor(sensorId: number): Observable<Sensor> {
        return this.http.get<Sensor>(`${this.apiUrl}/sensors/${sensorId}`);
    }

    getMeasurementsFromSensor(sensorId: number, timePeriod: string): Observable<Measurement[]> {
        return this.http.get<Measurement[]>(`${this.apiUrl}/sensors/${sensorId}/measurements?period=${timePeriod}`);
    }
    getMeasurementsFromSensorForPeriod(sensorId: number, period: string): Observable<Measurement[]> {
        return this.http.get<Array<Measurement>>(`${this.apiUrl}/sensors/${sensorId}/measurements/${period}`);
    }
}
//---------------------------------------------------