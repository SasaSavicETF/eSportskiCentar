import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Klijent } from '../models/klijent';
import { Router } from '@angular/router';
import { UserDTO } from '../models/user-dto';
import { isPlatformBrowser } from '@angular/common';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})

export class KlijentService {

  private url = 'http://localhost:8080/klijent';
  public activeUser: UserDTO | null = null;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private encryption: EncryptionService) {
    if (isPlatformBrowser(this.platformId) && localStorage !== undefined){
      const storedUser = localStorage.getItem('activeUser');
      if (storedUser){
        this.activeUser = this.encryption.decryptData(storedUser);
        if (this.activeUser && new Date().getTime() > this.activeUser?.expiry){
          this.logout();
          this.router.navigate(['/index']);
        }
      }
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

  checkExpiry(): boolean {
    if (this.activeUser && new Date().getTime() > this.activeUser?.expiry)
      return false;
    else
      return true;
  }

  logout() {
    this.activeUser = null;
    if (isPlatformBrowser(this.platformId) && localStorage !== undefined)
      localStorage.removeItem('activeUser');

    //this.router.navigate(['/index']);
  }

}
