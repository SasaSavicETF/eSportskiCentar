import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Svlacionica } from '../models/svlacionica';

@Injectable({
  providedIn: 'root'
})
export class SvlacionicaService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getSvlacionicas(): Observable<Svlacionica[]>
  {
    return this.http.get<Svlacionica[]>(`${this.apiServerUrl}/svlacionica`);
  }

  public getSvlacionicaById(svlacionicaId: number): Observable<Svlacionica>
  {
    return this.http.get<Svlacionica>(`${this.apiServerUrl}/svlacionica/${svlacionicaId}`);
  }

  public addSvlacionica(svlacionica: Svlacionica): Observable<Svlacionica> {
      return this.validateSvlacionica(svlacionica).pipe(
        switchMap(() => this.http.post<Svlacionica>(`${this.apiServerUrl}/svlacionica/add`, svlacionica)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateSvlacionica(svlacionica: Svlacionica): Observable<Svlacionica>
  {
    return this.validateSvlacionica(svlacionica).pipe(
      switchMap(() => this.http.put<Svlacionica>(`${this.apiServerUrl}/svlacionica/update`, svlacionica)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteSvlacionica(svlacionicaId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/svlacionica/${svlacionicaId}`);
  }

  private validateSvlacionica(svlacionica: Svlacionica): Observable<void> 
  {
    if (!svlacionica.dvorana) {
      return throwError(() => 'Dvorana mora biti unesena.');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
