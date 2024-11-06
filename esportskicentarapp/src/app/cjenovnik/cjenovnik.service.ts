import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Cjenovnik } from '../models/cjenovnik';

@Injectable({
    providedIn:'root'
})

export class CjenovnikService {

    private apiServerUrl = environment.apiServerUrl;

    constructor(private http: HttpClient) {}

    public getCjenovniks() : Observable<Cjenovnik[]> 
    {
        return this.http.get<Cjenovnik[]>(`${this.apiServerUrl}/cjenovnik`);
    }

    public getCjenovnikById(cjenovnikId: number) : Observable<Cjenovnik> 
    {
        return this.http.get<Cjenovnik>(`${this.apiServerUrl}/cjenovnik/${cjenovnikId}`)
    }

    public addCjenovnik(cjenovnik: Cjenovnik) : Observable<Cjenovnik>
    {
        return this.validateCjenovnik(cjenovnik).pipe(
        switchMap(() =>   this.http.post<Cjenovnik>(`${this.apiServerUrl}/cjenovnik/add`, cjenovnik)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
        );
      
    }

    public updateCjenovnik(cjenovnik: Cjenovnik) : Observable<Cjenovnik>
    {
        return this.validateCjenovnik(cjenovnik).pipe(
        switchMap(() =>   this.http.put<Cjenovnik>(`${this.apiServerUrl}/cjenovnik/update`, cjenovnik)),
        catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error })))
        );
      
    }

    public deleteCjenovnik(cjenovnikId: number) : Observable<void>
    {
        return this.http.delete<void>(`${this.apiServerUrl}/cjenovnik/${cjenovnikId}`);
    }


    private validateCjenovnik(cjenovnik: Cjenovnik) : Observable<void> {

        if(!cjenovnik.vrijemeDo) {
            return throwError(() => "Vrijeme do je obavezno.");
        }
        if(!cjenovnik.vrijemeOd && cjenovnik.vrijemeDo > cjenovnik.vrijemeOd) {
            return throwError(() => "Vrijeme od je obavezno.");
        }
        if(!cjenovnik.cijena || cjenovnik.cijena < 0) {
            return throwError(() => "Cijena mora biti pozitivan broj.");
        }
        if(!cjenovnik.teren) {
            return throwError(() => "Teren mora biti unesen.");
        }

        return this.getCjenovniks().pipe(
            switchMap((response: Cjenovnik[]) =>{
                for(let c of response)
                {
                    if(c.teren.idTeren === cjenovnik.teren.idTeren)
                    {
                        if(
                            (cjenovnik.vrijemeOd >= c.vrijemeOd && cjenovnik.vrijemeOd < c.vrijemeDo) ||
                            (cjenovnik.vrijemeDo > c.vrijemeOd && cjenovnik.vrijemeDo <= c.vrijemeDo) ||
                            (cjenovnik.vrijemeOd <= c.vrijemeOd && cjenovnik.vrijemeDo >= c.vrijemeDo)
                        ) {
                            return throwError(() => new Error('Cjenovnik se ne može dodati zbog sukoba u vremenskim intervalima.'));
                        }
                    }
                }
                return new Observable<void>((observer) => {
                    observer.next();
                    observer.complete();
                  });
            }) 
        );
    }

    public getCjenovnikByTerenId(terenId: number) : Observable<Cjenovnik[]> 
    {
        return this.http.get<Cjenovnik[]>(`${this.apiServerUrl}/cjenovnik/teren/${terenId}`)
    }
}