import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Klijent } from '../models/klijent';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  private url = 'http://localhost:8080/klijent';
  public activeUser: Klijent | null = null;

  constructor(private http: HttpClient) { }

  registerUser(user: Klijent) {
    return this.http.post<any>(this.url + '/register', user);
  }

  loginUser(username: string, password: string){
    return this.http.post<Klijent>(this.url + '/login', {
      username : username,
      password : password,
    });
  }

}
