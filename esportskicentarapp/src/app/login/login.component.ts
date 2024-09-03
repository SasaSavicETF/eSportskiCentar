import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private router : Router, private klijentService: KlijentService){}

  login() {

    this.klijentService.loginUser(this.username, this.password).subscribe({
      next: response => {
        this.klijentService.activeUser = response;
        this.router.navigate(['/teren']); 
      },
      error: error => {
        alert("Uneseni kredencijali nisu validni!");
      }
    });
    
  }

  register(){
    this.router.navigate(['/register']); 
  }

}
