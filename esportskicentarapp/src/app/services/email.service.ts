import { Injectable } from '@angular/core';
import { Email } from '../models/email';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = 'http://localhost:8080/email';

  constructor(private http: HttpClient) { }

  sendEmail(email: Email) {
    return this.http.post<any>(this.url, email);
  }

}
