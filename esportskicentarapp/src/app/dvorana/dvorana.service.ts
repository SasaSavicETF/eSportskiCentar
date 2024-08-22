import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Dvorana } from '../models/dvorana';

@Injectable({
  providedIn: 'root'
})
export class DvoranaService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getDvoranas(): Observable<Dvorana[]>
  {
    return this.http.get<Dvorana[]>(`${this.apiServerUrl}/dvorana/all`);
  }

  public getDvoranaById(dvoranaId: number): Observable<Dvorana>
  {
    return this.http.get<Dvorana>(`${this.apiServerUrl}/dvorana/find/${dvoranaId}`);
  }

  /*public addDvorana(dvorana: Dvorana): Observable<Dvorana>
  {
    return this.http.post<Dvorana>(`${this.apiServerUrl}/dvorana/add`, dvorana);
  }*/

    public addDvorana(dvorana: Dvorana): Observable<Dvorana> {
      return this.validateDvorana(dvorana).pipe(
        switchMap(() => this.http.post<Dvorana>(`${this.apiServerUrl}/dvorana/add`, dvorana)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateDvorana(dvorana: Dvorana): Observable<Dvorana>
  {
    //return this.http.put<Dvorana>(`${this.apiServerUrl}/dvorana/update`, dvorana);
    return this.validateDvorana(dvorana).pipe(
      switchMap(() => this.http.put<Dvorana>(`${this.apiServerUrl}/dvorana/update`, dvorana)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteDvorana(dvoranaId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/dvorana/delete/${dvoranaId}`);
  }

  private validateDvorana(dvorana: Dvorana): Observable<void> {
    // Primer validacije
    if (!dvorana.nazivDvorane || dvorana.nazivDvorane.trim().length === 0) {
      return throwError(() => 'Ime dvorane je obavezno.');
    }
    if (!dvorana.kapacitet || dvorana.kapacitet < 0) {
      return throwError(() => 'Kapacitet dvorane mora biti pozitivan broj.');
    }
    
    // Dodaj ostale validacije po potrebi

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
