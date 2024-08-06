import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Ulaz } from '../models/ulaz';

@Injectable({
  providedIn: 'root'
})
export class UlazService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getUlazs(): Observable<Ulaz[]>
  {
    return this.http.get<Ulaz[]>(`${this.apiServerUrl}/ulaz`);
  }

  public getUlazById(ulazId: number): Observable<Ulaz>
  {
    return this.http.get<Ulaz>(`${this.apiServerUrl}/ulaz/${ulazId}`);
  }

  public addUlaz(ulaz: Ulaz): Observable<Ulaz> {
      return this.validateUlaz(ulaz).pipe(
        switchMap(() => this.http.post<Ulaz>(`${this.apiServerUrl}/ulaz`, ulaz)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateUlaz(ulaz: Ulaz): Observable<Ulaz>
  {
    return this.validateUlaz(ulaz).pipe(
      switchMap(() => this.http.put<Ulaz>(`${this.apiServerUrl}/ulaz`, ulaz)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteUlaz(ulazId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/ulaz/${ulazId}`);
  }

  private validateUlaz(ulaz: Ulaz): Observable<void> 
  {
    if (!ulaz.nazivUlaza || ulaz.nazivUlaza.trim().length === 0) {
      return throwError(() => 'Ime ulaza je obavezno.');
    }
    if (!ulaz.brojUlaza || ulaz.brojUlaza <= 0) {
      return throwError(() => 'Broj ulaza mora biti pozitivan.');
    }
    if (!ulaz.dvorana) {
      return throwError(() => 'Dvorana mora biti unesena.');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
