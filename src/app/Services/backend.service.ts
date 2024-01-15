//backend.service.ts Inhalt:

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Sensor } from '../Models/sensor.model';
import { PaginatedResponse } from '../Models/paginated-response.model';


@Injectable({
  providedIn: 'root'
})

export class BackendService {
  private apiUrl = 'http://localhost:8080/rest-api';

  constructor(private http: HttpClient) { }

  getSensors(): Observable<PaginatedResponse<Sensor>> {
    return this.http.get<PaginatedResponse<Sensor>>(this.apiUrl + '/sensors?page=0&size=10');
  }

}
//---------------------------------------------------