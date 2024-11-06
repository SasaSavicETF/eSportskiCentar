import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Dogadjaj } from '../models/dogadjaj';
import { DogadjajDTO } from '../models/dogadjaj-dto';

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

  public getAllFilteredDogadjajs(idDR: number, idT: number): Observable<Dogadjaj[]>
  {
    return this.http.get<Dogadjaj[]>(`${this.apiServerUrl}/dogadjaj/filtered/${idDR}/${idT}`);
  }

  public getDogadjajsOfUser(userId: number): Observable<Dogadjaj[]>
  {
    return this.http.get<Dogadjaj[]>(`${this.apiServerUrl}/dogadjaj/user/${userId}`);
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
  

  public vremenskiSukob(dogadjaj: Dogadjaj): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiServerUrl}/dogadjaj/sukob`, dogadjaj);
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

  private validateDogadjaj(dogadjaj: Dogadjaj): Observable<void> {
    if (!dogadjaj.vrijemeOd) {
      return throwError(() => new Error('Vrijeme mora biti uneseno.'));
    }
    if (!dogadjaj.takmicenje) {
      return throwError(() => new Error('Id takmicenja mora biti pozitivan.'));
    }
    if (!dogadjaj.dnevniRaspored) {
      return throwError(() => new Error('Dnevni raspored mora biti unesen.'));
    }
    if (!dogadjaj.teren) {
      return throwError(() => new Error('Teren mora biti unesen.'));
    }
  
    if (dogadjaj.vrijemeOd >= dogadjaj.vrijemeDo) {
      return throwError(() => new Error('Vrijeme početka treba da bude manje od vremena kraja.'));
    }
  
    return this.getDogadjajs().pipe(
      switchMap((dogadjaji: Dogadjaj[]) => {
        for (let dogadjajLst of dogadjaji) {
          if (dogadjaj.dnevniRaspored.idDnevniRaspored === dogadjajLst.dnevniRaspored.idDnevniRaspored && dogadjajLst.odobren && dogadjaj.teren.idTeren === dogadjajLst.teren.idTeren) {
            if (
              (dogadjaj.vrijemeOd >= dogadjajLst.vrijemeOd && dogadjaj.vrijemeOd < dogadjajLst.vrijemeDo) ||
              (dogadjaj.vrijemeDo > dogadjajLst.vrijemeOd && dogadjaj.vrijemeDo <= dogadjajLst.vrijemeDo) ||
              (dogadjaj.vrijemeOd <= dogadjajLst.vrijemeOd && dogadjaj.vrijemeDo >= dogadjajLst.vrijemeDo)
            ) {
              return throwError(() => new Error('Događaj se ne može dodati zbog sukoba u vremenskim intervalima.'));
            }
          }
        }
        return of(undefined); // Vraća Observable<void> koji emituje undefined i zatvara se
      })
    );
  }

  public getWeeklyEvents(idTeren: number | undefined, nextSevenDaysSQL: (string | null)[]): Observable<DogadjajDTO[]>{
    const payload = { "idTeren": idTeren, "dates": nextSevenDaysSQL };
    return this.http.post<DogadjajDTO[]>(`${this.apiServerUrl}/dogadjaj`, payload);
  }
  

  /*
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

    if(dogadjaj.vrijemeOd >= dogadjaj.vrijemeDo)
    {
      return throwError(() => 'Vrijeme početka treba da bude manje od vremena kraja.');
    }

    let listaDogadjaja: Dogadjaj[] = [];
    this.getDogadjajs().subscribe((dogadjaji: Dogadjaj[]) => {
      listaDogadjaja = dogadjaji;
      // Sada možeš koristiti listaDogadjaja, npr:
      for(let dogadjajLst of listaDogadjaja)
      {
        if(dogadjaj.dnevniRaspored.idDnevniRaspored == dogadjajLst.dnevniRaspored.idDnevniRaspored)
        {
          if((dogadjaj.vrijemeOd >= dogadjajLst.vrijemeOd && dogadjaj.vrijemeOd < dogadjajLst.vrijemeDo) || 
              (dogadjaj.vrijemeDo > dogadjajLst.vrijemeOd && dogadjaj.vrijemeDo <= dogadjajLst.vrijemeDo))
              {
                return throwError(() => 'Događaj se ne može dodati zbog sukoba u vremenskim intervalima.');
              }
          else if((dogadjaj.vrijemeOd <= dogadjajLst.vrijemeOd && dogadjaj.vrijemeOd < dogadjajLst.vrijemeDo) ||
              (dogadjaj.vrijemeDo > dogadjajLst.vrijemeOd && dogadjaj.vrijemeDo >= dogadjajLst.vrijemeDo))
              {
                return throwError(() => 'Događaj se ne može dodati zbog sukoba u vremenskim intervalima.');
              }
        }
      }
      return new Observable<void>((observer) => {
        observer.next();
        observer.complete();
      });
    });


   /* return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }*/
}
