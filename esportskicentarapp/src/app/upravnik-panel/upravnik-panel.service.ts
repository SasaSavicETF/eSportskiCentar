import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Dogadjaj } from '../models/dogadjaj';
import { Observable } from 'rxjs';
import { DogadjajStatsDto } from '../models/dogadjaj-stats-dto';

@Injectable({
  providedIn: 'root'
})
export class UpravnikPanelService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getDogadjajsStatistic(period: string, userId: number) : Observable<DogadjajStatsDto[]> {
    return this.http.get<DogadjajStatsDto[]>(`${this.apiServerUrl}/dvorana/statistic/for/${period}/managed/${userId}`);
  }

  public getHallName(userId: number) :Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/dvorana/name/managed/${userId}`, { responseType: 'text' as 'json' });
  }

  public getZadatakStatistic(period: string, userId: number) :  Observable<{ [key: string]: number }>{
    return this.http.get<{ [key: string]: number }>(`${this.apiServerUrl}/zadatak/statistic/for/${period}/managed/${userId}`);
  }
}
