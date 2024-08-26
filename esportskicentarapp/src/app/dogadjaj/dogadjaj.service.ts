import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Dogadjaj } from '../models/dogadjaj';

@Injectable({
  providedIn: 'root'
})
export class DogadjajService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getDogadjajs(): Observable<Dogadjaj[]>
  {
    return this.http.get<Dogadjaj[]>(`${this.apiServerUrl}/dogadjaj`);
  }

  public getDogadjajById(dogadjajId: number): Observable<Dogadjaj>
  {
    return this.http.get<Dogadjaj>(`${this.apiServerUrl}/dogadjaj/${dogadjajId}`);
  }

  public addDogadjaj(dogadjaj: Dogadjaj): Observable<Dogadjaj> {
      return this.validateDogadjaj(dogadjaj).pipe(
        switchMap(() => this.http.post<Dogadjaj>(`${this.apiServerUrl}/dogadjaj/add`, dogadjaj)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
      );
    }
  
    

  public updateDogadjaj(dogadjaj: Dogadjaj): Observable<Dogadjaj>
  {
    return this.validateDogadjaj(dogadjaj).pipe(
      switchMap(() => this.http.put<Dogadjaj>(`${this.apiServerUrl}/dogadjaj/update`, dogadjaj)),
      catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
    );
  }

  public deleteDogadjaj(dogadjajId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/dogadjaj/${dogadjajId}`);
  }

  private validateDogadjaj(dogadjaj: Dogadjaj): Observable<void> 
  {
    if (!dogadjaj.vrijemeOd) {
      return throwError(() => 'Vrijeme mora biti uneseno.');
    }
    if (!dogadjaj.takmicenje) {
      return throwError(() => 'Id takmicenja mora biti pozitivan.');
    }
    if (!dogadjaj.dnevniRaspored) {
        return throwError(() => 'Dnevni raspored mora biti unesen.');
    }
    if (!dogadjaj.teren) {
      return throwError(() => 'Teren mora biti unesen.');
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
