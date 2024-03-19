import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dvorana } from '../models/dvorana';

@Injectable({
  providedIn: 'root'
})
export class DvoranaService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getDvoranas(): Observable<Dvorana[]>
  {
    return this.http.get<Dvorana[]>(`${this.apiServerUrl}/dvorana/all`);
  }

  public getDvoranaById(dvoranaId: number): Observable<Dvorana>
  {
    return this.http.get<Dvorana>(`${this.apiServerUrl}/dvorana/find/${dvoranaId}`);
  }

  public addDvorana(dvorana: Dvorana): Observable<Dvorana>
  {
    return this.http.post<Dvorana>(`${this.apiServerUrl}/dvorana/add`, dvorana);
  }

  public updateDvorana(dvorana: Dvorana): Observable<Dvorana>
  {
    return this.http.put<Dvorana>(`${this.apiServerUrl}/dvorana/update`, dvorana);
  }

  public deleteDvorana(dvoranaId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/dvorana/delete/${dvoranaId}`);
  }
}
