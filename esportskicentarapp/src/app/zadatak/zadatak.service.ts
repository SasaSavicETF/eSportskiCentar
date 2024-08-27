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
      if(!this.isValidDate(zadatak.datumKreiranja) || (zadatak.rokIzvrsenja && !this.isValidDate(zadatak.rokIzvrsenja))){ 
        return throwError(() => 'Datum nije validan.');
      }
      if (zadatak.rokIzvrsenja && this.compareDates(zadatak.rokIzvrsenja, zadatak.datumKreiranja) !== 1) {
        return throwError(() => 'Rok izvrsenja mora biti veci od datuma kreiranja.');
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

    private isValidDate(dateString: string): boolean {
      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
  
      if (!datePattern.test(dateString)) {
          return false;
      }
  
      const [day, month, year] = dateString.split('.').map(Number);
  
      if (month < 1 || month > 12) {
          return false;
      }
  
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) {
          return false;
      }
  
      return true;
  }

  private compareDates(dateString1: string, dateString2: string): number {

    const [day1, month1, year1] = dateString1.split('.').map(Number);
    const [day2, month2, year2] = dateString2.split('.').map(Number);

    const date1 = new Date(year1, month1 - 1, day1);
    const date2 = new Date(year2, month2 - 1, day2);

    if (date1 < date2) {
        return -1; 
    } else if (date1 > date2) {
        return 1; 
    } else {
        return 0; 
    }
}
  
}