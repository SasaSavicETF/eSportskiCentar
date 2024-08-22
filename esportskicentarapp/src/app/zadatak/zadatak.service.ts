import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Zadatak } from "../models/zadatak";

@Injectable({
    providedIn: 'root'
})

export class ZadatakService {
    private apiServerUrl = environment.apiServerUrl;

    constructor(private http: HttpClient) { }
  
    public getZadataks(): Observable<Zadatak[]>
    {
      return this.http.get<Zadatak[]>(`${this.apiServerUrl}/zadatak`);
    }
  
    public getZadatakById(zadatakId: number): Observable<Zadatak>
    {
      return this.http.get<Zadatak>(`${this.apiServerUrl}/zadatak/${zadatakId}`);
    }
  
    public addZadatak(zadatak: Zadatak): Observable<Zadatak> {
        return this.validateZadatak(zadatak).pipe(
          switchMap(() => this.http.post<Zadatak>(`${this.apiServerUrl}/zadatak/add`, zadatak)),
          catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
        );
      }
    
      
  
    public updateZadatak(zadatak: Zadatak): Observable<Zadatak>
    {
      return this.validateZadatak(zadatak).pipe(
        switchMap(() => this.http.put<Zadatak>(`${this.apiServerUrl}/zadatak/update`, zadatak)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    public deleteZadatak(zadatakId: number): Observable<void>
    {
      return this.http.delete<void>(`${this.apiServerUrl}/zadatak/${zadatakId}`);
    }
  
    private validateZadatak(zadatak: Zadatak): Observable<void> 
    {
      if (!zadatak.datumKreiranja) {
        return throwError(() => 'Datum mora biti unesen.');
      }
      if (!zadatak.upravnik) {
        return throwError(() => 'Upravnik mora biti unesen.');
      }
      if (!zadatak.dezurniRadnik) {
        return throwError(() => 'Dezurni radnik mora biti unesen.');
      }
  
      return new Observable<void>((observer) => {
        observer.next();
        observer.complete();
      });
    }
}