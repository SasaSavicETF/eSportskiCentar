import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Raspored } from '../models/raspored';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getRasporeds(): Observable<Raspored[]>
  {
    return this.http.get<Raspored[]>(`${this.apiServerUrl}/raspored`);
  }

  public getRasporedById(rasporedId: number): Observable<Raspored>
  {
    return this.http.get<Raspored>(`${this.apiServerUrl}/raspored/${rasporedId}`);
  }

  public addRaspored(raspored: Raspored): Observable<Raspored>
  {
    return this.http.post<Raspored>(`${this.apiServerUrl}/raspored`, raspored);
  }

  public updateRaspored(raspored: Raspored): Observable<Raspored>
  {
    return this.http.put<Raspored>(`${this.apiServerUrl}/raspored`, raspored);
  }

  public deleteRaspored(rasporedId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/raspored/${rasporedId}`);
  }
}
