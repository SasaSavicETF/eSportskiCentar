import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ZaradaStatsDto } from '../models/zarada-stats-dto';
import { StatsDto } from '../models/stats-dto';

@Injectable({
  providedIn: 'root'
})
export class FinansijeService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  getZaradaData(period: string) :Observable<ZaradaStatsDto[]>{
    return this.http.get<ZaradaStatsDto[]>(`${this.apiServerUrl}/dogadjaj/revenue/for/${period}/byType`);
  }
  getSportData(period: string) :Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiServerUrl}/dogadjaj/revenue/for/${period}/bySport`);
  }
  getSpecificSportData(period: string, sportName: string) : Observable<StatsDto[]>{
    return this.http.get<StatsDto[]>(`${this.apiServerUrl}/dogadjaj/revenue/for/${period}/forSport/${sportName}`)
  }

  getDvoranaData(period: string) :Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiServerUrl}/dogadjaj/revenue/for/${period}/byDvorana`);
  }

  getSpecificDvoranaData(period: string, dvoranaName: any) : Observable<StatsDto[]> {
    return this.http.get<StatsDto[]>(`${this.apiServerUrl}/dogadjaj/revenue/for/${period}/forDvorana/${dvoranaName}`)
  }
}
