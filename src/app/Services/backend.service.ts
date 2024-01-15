import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:8080/rest-api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getSensors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/sensors');
  }

}