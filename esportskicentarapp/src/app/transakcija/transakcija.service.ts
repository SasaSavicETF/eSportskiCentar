import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { Transakcija } from "../models/transakcija";
import { environment } from "../../environments/environment.development";


@Injectable({
    providedIn: 'root'
})
export class TransakcijaService
{
    private apiServerUrl = environment.apiServerUrl;

    constructor(private http: HttpClient) { }

    public getTransakcijas(): Observable<Transakcija[]>
    {
        return this.http.get<Transakcija[]>(`${this.apiServerUrl}/transakcija`);
    }

    public getTransakcijaById(transakcijaId: number): Observable<Transakcija>
    {
        return this.http.get<Transakcija>(`${this.apiServerUrl}/transakcija/${transakcijaId}`);
    }

    public addTransakcija(transakcija: Transakcija): Observable<Transakcija> 
    {
        return this.validateTransakcija(transakcija).pipe(
          switchMap(() => this.http.post<Transakcija>(`${this.apiServerUrl}/transakcija`, transakcija)),
          catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
        );
    }

    public addTransakcijaJSON(transakcija: string): Observable<Transakcija> {
        //console.log(transakcija); // Ispisuje JSON string
      
        return this.validateTransakcija(JSON.parse(transakcija)).pipe(
          switchMap(() => 
            this.http.post<Transakcija>(`${this.apiServerUrl}/transakcija`, transakcija, {
              headers: { 'Content-Type': 'application/json' } // Postavlja Content-Type na application/json
            })
          ),
          catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
        );
      }
      
    
      
  
    public updateTransakcija(transakcija: Transakcija): Observable<Transakcija>
    {
      return this.validateTransakcija(transakcija).pipe(
        switchMap(() => this.http.put<Transakcija>(`${this.apiServerUrl}/transakcija`, transakcija)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    public deleteTransakcija(transakcijaId: number): Observable<void>
    {
      return this.http.delete<void>(`${this.apiServerUrl}/transakcija/${transakcijaId}`);
    }
  
    private validateTransakcija(transakcija: Transakcija): Observable<void> 
    {
        if (!transakcija.svrhaDoznake || transakcija.svrhaDoznake.trim().length === 0) {
            return throwError(() => 'Svrha doznake mora biti unesena.');
        }
        if(!transakcija.iznos || transakcija.iznos < 0.0)
        {
            return throwError(() => 'Nepravilan unos iznosa.');
        }
        return new Observable<void>((observer) => {
            observer.next();
            observer.complete();
        });
  }
}