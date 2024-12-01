import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Teren } from '../models/teren';



@Injectable({
  providedIn: 'root'
})
export class TerenService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getTerens(): Observable<Teren[]>
  {
    return this.http.get<Teren[]>(`${this.apiServerUrl}/teren`);
  }

  public getTerensByDostupanAndDvorana(idD: number): Observable<Teren[]>
  {
    return this.http.get<Teren[]>(`${this.apiServerUrl}/teren/dostupan/${idD}`);
  }

  public getTerenById(terenId: number): Observable<Teren>
  {
    return this.http.get<Teren>(`${this.apiServerUrl}/teren/${terenId}`);
  }

  public addTeren(formData: FormData): Observable<Teren> {
      /*return this.validateTeren(teren).pipe(
        switchMap(() => this.http.post<Teren>(`${this.apiServerUrl}/teren`, formData)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );*/
      return this.http.post<Teren>(`${this.apiServerUrl}/teren`, formData);
    }
  
    

  public updateTeren(teren: Teren): Observable<Teren>
  {
    return this.validateTeren(teren).pipe(
      switchMap(() => this.http.put<Teren>(`${this.apiServerUrl}/teren`, teren)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteTeren(terenId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/teren/${terenId}`);
  }

  private validateTeren(teren: Teren): Observable<void> 
  {
    if (!teren.nazivTerena || teren.nazivTerena.trim().length === 0) {
      return throwError(() => 'Naziv terena je obavezan.');
    }
    if (!teren.dvorana) {
      return throwError(() => 'Dvorana mora biti unesena.');
    }
    if (!teren.tipTerena) {
      return throwError(() => 'Tip terena mora biti unesen.');
    }
    if (!teren.duzina) {
      return throwError(() => 'Dužina mora biti unesena.');
    }
    if (!teren.sirina) {
      return throwError(() => 'Širina mora biti unesena.');
    }
    if (!teren.dostupan) {
      return throwError(() => 'Dostupnost mora biti unesena.');
    }
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
