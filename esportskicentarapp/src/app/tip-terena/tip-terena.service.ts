import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { TipTerena } from '../models/tipTerena';


@Injectable({
  providedIn: 'root'
})
export class TipTerenaService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getTipTerenas(): Observable<TipTerena[]>
  {
    return this.http.get<TipTerena[]>(`${this.apiServerUrl}/tipTerena`);
  }

  public getTipTerenaById(tipTerenaId: number): Observable<TipTerena>
  {
    return this.http.get<TipTerena>(`${this.apiServerUrl}/tipTerena/${tipTerenaId}`);
  }

  public addTipTerena(tipTerena: TipTerena): Observable<TipTerena> {
      return this.validateTipTerena(tipTerena).pipe(
        switchMap(() => this.http.post<TipTerena>(`${this.apiServerUrl}/tipTerena`, tipTerena)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateTipTerena(tipTerena: TipTerena): Observable<TipTerena>
  {
    return this.validateTipTerena(tipTerena).pipe(
      switchMap(() => this.http.put<TipTerena>(`${this.apiServerUrl}/tipTerena`, tipTerena)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteTipTerena(tipTerenaId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/tipTerena/${tipTerenaId}`);
  }

  private validateTipTerena(tipTerena: TipTerena): Observable<void> 
  {
    if (!tipTerena.nazivTipaTerena || tipTerena.nazivTipaTerena.trim().length === 0) {
      return throwError(() => 'Ime tipa terena je obavezno.');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
