import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getSports(): Observable<Sport[]>
  {
    return this.http.get<Sport[]>(`${this.apiServerUrl}/sport`);
  }

  public getSportById(sportId: number): Observable<Sport>
  {
    return this.http.get<Sport>(`${this.apiServerUrl}/sport/${sportId}`);
  }

  public addSport(sport: Sport): Observable<Sport> {
      return this.validateSport(sport).pipe(
        switchMap(() => this.http.post<Sport>(`${this.apiServerUrl}/sport`, sport)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateSport(sport: Sport): Observable<Sport>
  {
    return this.validateSport(sport).pipe(
      switchMap(() => this.http.put<Sport>(`${this.apiServerUrl}/sport`, sport)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteSport(sportId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/sport/${sportId}`);
  }

  private validateSport(sport: Sport): Observable<void> 
  {
    if (!sport.nazivSporta || sport.nazivSporta.trim().length === 0) {
      return throwError(() => 'Ime sporta je obavezno.');
    }
    if (!sport.duzina || sport.duzina <= 0) {
      return throwError(() => 'Neophodna duzina mora biti pozitivan broj.');
    }
    if (!sport.sirina || sport.sirina <= 0) {
      return throwError(() => 'Neophodna sirina mora biti pozitivan broj.');
    }
    if (!sport.tipTerena) {
      return throwError(() => 'Tip terena mora biti unesen');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
