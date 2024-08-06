import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Takmicenje } from '../models/takmicenje';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getTakmicenjes(): Observable<Takmicenje[]>
  {
    return this.http.get<Takmicenje[]>(`${this.apiServerUrl}/takmicenje`);
  }

  public getTakmicenjeById(takmicenjeId: number): Observable<Takmicenje>
  {
    return this.http.get<Takmicenje>(`${this.apiServerUrl}/takmicenje/${takmicenjeId}`);
  }

  public addTakmicenje(takmicenje: Takmicenje): Observable<Takmicenje>
  {
    return this.http.post<Takmicenje>(`${this.apiServerUrl}/takmicenje`, takmicenje);
  }

  public updateTakmicenje(takmicenje: Takmicenje): Observable<Takmicenje>
  {
    return this.http.put<Takmicenje>(`${this.apiServerUrl}/takmicenje`, takmicenje);
  }

  public deleteTakmicenje(takmicenjeId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/takmicenje/${takmicenjeId}`);
  }
}
