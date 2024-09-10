import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Ekipa } from '../models/ekipa';


@Injectable({
  providedIn: 'root'
})
export class EkipaService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getEkipas(): Observable<Ekipa[]>
  {
    return this.http.get<Ekipa[]>(`${this.apiServerUrl}/ekipa`);
  }

  public getEkipaById(ekipaId: number): Observable<Ekipa>
  {
    return this.http.get<Ekipa>(`${this.apiServerUrl}/ekipa/${ekipaId}`);
  }

  public addEkipa(ekipa: Ekipa): Observable<Ekipa> {
      return this.validateEkipa(ekipa).pipe(
        switchMap(() => this.http.post<Ekipa>(`${this.apiServerUrl}/ekipa`, ekipa)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateEkipa(ekipa: Ekipa): Observable<Ekipa>
  {
    return this.validateEkipa(ekipa).pipe(
      switchMap(() => this.http.put<Ekipa>(`${this.apiServerUrl}/ekipa`, ekipa)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteEkipa(ekipaId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/ekipa/${ekipaId}`);
  }

  private validateEkipa(ekipa: Ekipa): Observable<void> 
  {
    if (!ekipa.nazivEkipe || ekipa.nazivEkipe.trim().length === 0) {
      return throwError(() => 'Ime ekipe je obavezno.');
    }
    if (!ekipa.sport) {
      return throwError(() => 'Sport mora biti unesen.');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
