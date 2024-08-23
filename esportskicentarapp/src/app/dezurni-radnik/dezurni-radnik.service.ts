import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { DezurniRadnik } from '../models/dezurniRadnik';



@Injectable({
  providedIn: 'root'
})
export class DezurniRadnikService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getDezurniRadniks(): Observable<DezurniRadnik[]>
  {
    return this.http.get<DezurniRadnik[]>(`${this.apiServerUrl}/dezurniRadnik`);
  }

  public getDezurniRadnikById(dezurniRadnikId: number): Observable<DezurniRadnik>
  {
    return this.http.get<DezurniRadnik>(`${this.apiServerUrl}/dezurniRadnik/${dezurniRadnikId}`);
  }

  public addDezurniRadnik(dezurniRadnik: DezurniRadnik): Observable<DezurniRadnik> {
      return this.validateDezurniRadnik(dezurniRadnik).pipe(
        switchMap(() => this.http.post<DezurniRadnik>(`${this.apiServerUrl}/dezurniRadnik/add`, dezurniRadnik)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateDezurniRadnik(dezurniRadnik: DezurniRadnik): Observable<DezurniRadnik>
  {
    return this.validateDezurniRadnik(dezurniRadnik).pipe(
      switchMap(() => this.http.put<DezurniRadnik>(`${this.apiServerUrl}/dezurniRadnik/update`, dezurniRadnik)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteDezurniRadnik(dezurniRadnikId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/dezurniRadnik/${dezurniRadnikId}`);
  }

  private validateDezurniRadnik(dezurniRadnik: DezurniRadnik): Observable<void> 
  {
    if (!dezurniRadnik.ime || dezurniRadnik.ime.trim().length === 0) {
      return throwError(() => 'Ime dezurniRadnika je obavezno.');
    }
    if (!dezurniRadnik.prezime || dezurniRadnik.prezime.trim().length === 0) {
      return throwError(() => 'Prezime dezurniRadnika je obavezno.');
    }
    if (!dezurniRadnik.brojTelefona)  {
      return throwError(() => 'Broj telefona mora biti unesen.');
    }
    if (!dezurniRadnik.korisnickoIme || dezurniRadnik.korisnickoIme.trim().length === 0)  {
      return throwError(() => 'Korisnicko ime mora biti unesena.');
    }
    if (!dezurniRadnik.lozinka || dezurniRadnik.lozinka.trim().length === 0)  {
      return throwError(() => 'Lozinka mora biti unesena.');
    }
    if (!dezurniRadnik.email)  {
      return throwError(() => 'Email mora biti unesena.');
    }
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
