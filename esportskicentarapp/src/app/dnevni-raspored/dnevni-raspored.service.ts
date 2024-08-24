import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { DnevniRaspored } from '../models/dnevniRaspored';

@Injectable({
  providedIn: 'root'
})
export class DnevniRasporedService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getDnevniRasporeds(): Observable<DnevniRaspored[]>
  {
    return this.http.get<DnevniRaspored[]>(`${this.apiServerUrl}/dnevniraspored`);
  }

  public getDnevniRasporedById(dnevniRasporedId: number): Observable<DnevniRaspored>
  {
    return this.http.get<DnevniRaspored>(`${this.apiServerUrl}/dnevniraspored/${dnevniRasporedId}`);
  }

  public addDnevniRaspored(dnevniRaspored: DnevniRaspored): Observable<DnevniRaspored> {
    console.log(dnevniRaspored.datum);
      return this.validateDnevniRaspored(dnevniRaspored).pipe(
        switchMap(() => this.http.post<DnevniRaspored>(`${this.apiServerUrl}/dnevniraspored/add`, dnevniRaspored)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    public addDnevniRasporedJSON(dnevniRaspored: string): Observable<DnevniRaspored> {
      console.log(dnevniRaspored); // Ispisuje JSON string
    
      return this.validateDnevniRaspored(JSON.parse(dnevniRaspored)).pipe(
        switchMap(() => 
          this.http.post<DnevniRaspored>(`${this.apiServerUrl}/dnevniraspored/add`, dnevniRaspored, {
            headers: { 'Content-Type': 'application/json' } // Postavlja Content-Type na application/json
          })
        ),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
    
    
    /* 
, {
            headers: { 'Content-Type': 'application/json' } // Postavlja Content-Type na application/json
          }
    */

  public updateDnevniRaspored(dnevniRaspored: DnevniRaspored): Observable<DnevniRaspored>
  {
    return this.validateDnevniRaspored(dnevniRaspored).pipe(
      switchMap(() => this.http.put<DnevniRaspored>(`${this.apiServerUrl}/dnevniraspored/update`, dnevniRaspored)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteDnevniRaspored(dnevniRasporedId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/dnevniraspored/${dnevniRasporedId}`);
  }

  private validateDnevniRaspored(dnevniRaspored: DnevniRaspored): Observable<void> 
  {
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
