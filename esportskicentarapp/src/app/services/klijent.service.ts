import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Klijent } from '../models/klijent';
import { Router } from '@angular/router';
import { UserDTO } from '../models/user-dto';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class KlijentService {

  private url = 'http://localhost:8080/klijent';
  public activeUser: UserDTO | null = null;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId) && localStorage !== undefined){
      const storedUser = localStorage.getItem('activeUser');
      if (storedUser)
        this.activeUser = JSON.parse(storedUser);
    }
  }

  registerUser(user: Klijent) {
    return this.http.post<any>(this.url + '/register', user);
  }

  loginUser(username: string, password: string){
    return this.http.post<UserDTO>(this.url + '/login', {
      username : username,
      password : password,
    });
  }

  logout() {
    this.activeUser = null;
    if (localStorage !== undefined)
      localStorage.removeItem('activeUser');

    this.router.navigate(['/login']);
  }

}
