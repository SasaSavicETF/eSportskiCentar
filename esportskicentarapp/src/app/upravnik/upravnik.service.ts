import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Upravnik } from '../models/upravnik';



@Injectable({
  providedIn: 'root'
})
export class UpravnikService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getUpravniks(): Observable<Upravnik[]>
  {
    return this.http.get<Upravnik[]>(`${this.apiServerUrl}/upravnik`);
  }

  public getUpravnikById(upravnikId: number): Observable<Upravnik>
  {
    return this.http.get<Upravnik>(`${this.apiServerUrl}/upravnik/${upravnikId}`);
  }

  public addUpravnik(upravnik: Upravnik): Observable<Upravnik> {
      return this.validateUpravnik(upravnik).pipe(
        switchMap(() => this.http.post<Upravnik>(`${this.apiServerUrl}/upravnik/add`, upravnik)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateUpravnik(upravnik: Upravnik): Observable<Upravnik>
  {
    return this.validateUpravnik(upravnik).pipe(
      switchMap(() => this.http.put<Upravnik>(`${this.apiServerUrl}/upravnik/update`, upravnik)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteUpravnik(upravnikId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/upravnik/${upravnikId}`);
  }

  private validateUpravnik(upravnik: Upravnik): Observable<void> 
  {
    if (!upravnik.ime || upravnik.ime.trim().length === 0) {
      return throwError(() => 'Ime upravnika je obavezno.');
    }
    if (!upravnik.prezime || upravnik.prezime.trim().length === 0) {
      return throwError(() => 'Prezime upravnika je obavezno.');
    }
    if (!upravnik.brojTelefona)  {
      return throwError(() => 'Broj telefona mora biti unesen.');
    }
    if (!upravnik.korisnickoIme || upravnik.korisnickoIme.trim().length === 0)  {
      return throwError(() => 'Korisnicko ime mora biti uneseno.');
    }
    if (!upravnik.lozinka || upravnik.lozinka.trim().length === 0)  {
      return throwError(() => 'Lozinka mora biti unesena.');
    }
    if (!upravnik.email)  {
      return throwError(() => 'Email mora biti unesena.');
    }
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
