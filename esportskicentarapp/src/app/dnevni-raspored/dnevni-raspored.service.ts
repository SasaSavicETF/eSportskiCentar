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
    if(!this.isValidDate(dnevniRaspored.datum)) {
      return throwError(() => 'Datum nije validan.');
    }
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }

  private isValidDate(dateString: string): boolean {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

    if (!datePattern.test(dateString)) {
        return false;
    }

    const [day, month, year] = dateString.split('.').map(Number);

    if (month < 1 || month > 12) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}
}
