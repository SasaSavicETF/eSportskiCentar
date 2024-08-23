import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Inventar } from '../models/inventar';

@Injectable({
  providedIn: 'root'
})
export class InventarService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getInventars(): Observable<Inventar[]>
  {
    return this.http.get<Inventar[]>(`${this.apiServerUrl}/inventar`);
  }

  public getInventarById(inventarId: number): Observable<Inventar>
  {
    return this.http.get<Inventar>(`${this.apiServerUrl}/inventar/${inventarId}`);
  }

  public addInventar(inventar: Inventar): Observable<Inventar> {
      return this.validateInventar(inventar).pipe(
        switchMap(() => this.http.post<Inventar>(`${this.apiServerUrl}/inventar/add`, inventar)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateInventar(inventar: Inventar): Observable<Inventar>
  {
    return this.validateInventar(inventar).pipe(
      switchMap(() => this.http.put<Inventar>(`${this.apiServerUrl}/inventar/update`, inventar)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteInventar(inventarId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/inventar/${inventarId}`);
  }

  private validateInventar(inventar: Inventar): Observable<void> 
  {
    if (!inventar.dvorana) {
      return throwError(() => 'Dvorana mora biti unesena.');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
