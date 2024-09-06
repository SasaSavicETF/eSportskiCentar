import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"; 
import { environment } from "../../environments/environment.development";
import { catchError, switchMap, map, throwError, Observable } from "rxjs";
import { Administrator } from '../models/administrator';

@Injectable({
    providedIn: 'root'
})
export class AdministratorService {
    private apiServerUrl = environment.apiServerUrl; 

    // Podešavanje za HTTP Request: 
    constructor(private http: HttpClient) {}

    public getAdministrators(): Observable<Administrator[]> {
        return this.http.get<Administrator[]>(`${this.apiServerUrl}/administrator`); 
    }

    public validateAdministrator(administrator: Administrator): Observable<void> {
        if(!administrator.ime || administrator.ime.length === 0) {
            return throwError(() => 'Ime administratora nije uneseno.'); 
        } else if(!administrator.prezime || administrator.prezime.length === 0) {
            return throwError(() => 'Prezime administratora nije uneseno.'); 
        } else if(!administrator.korisnickoIme || administrator.korisnickoIme.length === 0) {
            return throwError(() => 'Korisnicko ime administratora nije uneseno.'); 
        } else if(!administrator.lozinka || administrator.lozinka.length === 0) {
            return throwError(() => 'Lozinka administratora nije unesena.'); 
        } else if(!administrator.email || administrator.email.length === 0) {
            return throwError(() => 'Email administratora nije unesen.'); 
        } else {
            return new Observable<void>((observer) => {
                observer.next(); 
                observer.complete(); 
            }); 
        }
    }

    // ADD: 
    public addAdministrator(administrator: Administrator): Observable<Administrator> {
        return this.validateAdministrator(administrator).pipe(
            switchMap(() => this.http.post<Administrator>(`${this.apiServerUrl}/administrator`, administrator)),
            catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error})))
        ); 
    }

    // UPDATE: 
    public updateAdministrator(administrator: Administrator): Observable<Administrator> {
        return this.validateAdministrator(administrator).pipe(
            switchMap(() => this.http.put<Administrator>(`${this.apiServerUrl}/administrator/${administrator.idAdministrator}`,
                administrator
            )),
            catchError((error) => throwError(() => new HttpErrorResponse({ status: 400, statusText: error})))
        ); 
    }

    // DELETE: 
    public deleteAdministrator(idAdministrator: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/administrator/${idAdministrator}`); 
    }
}
