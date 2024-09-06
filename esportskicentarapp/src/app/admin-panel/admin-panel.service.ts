import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  public getNumberOfKlijents() : Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/klijent/statistic/total`);
  }

  public getNumberOfDogadjajs() : Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/dogadjaj/statistic/total`);
  }

  public getNumberOfDvoranas() : Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/dvorana/statistic/total`);
  }

  public getNumberOfRezervacija() : Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/zahtjev/statistic/total`);
  }
}
