import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grad } from '../models/grad';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GradService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getGrads(): Observable<Grad[]>
  {
    return this.http.get<Grad[]>(`${this.apiServerUrl}/grad/all`);
  }

  public getGradById(gradId: number): Observable<Grad>
  {
    return this.http.get<Grad>(`${this.apiServerUrl}/grad/find/${gradId}`);
  }

  public addGrad(grad: Grad): Observable<Grad>
  {
    return this.http.post<Grad>(`${this.apiServerUrl}/grad/add`, grad);
  }

  public updateGrad(grad: Grad): Observable<Grad>
  {
    return this.http.put<Grad>(`${this.apiServerUrl}/grad/update`, grad);
  }

  public deleteGrad(gradId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/grad/delete/${gradId}`);
  }
}
