import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';

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
        if (localStorage !== undefined){
          localStorage.removeItem('activeUser');
          localStorage.setItem('activeUser', JSON.stringify(response));
        }
        this.klijentService.activeUser = response;

        if(this.klijentService.activeUser.role == 'admin') {
          this.router.navigate(['/adminPanel']);
        } else if(this.klijentService.activeUser.role == 'radnik') {
          this.router.navigate(['/radnik/zadaci']);
        } else if(this.klijentService.activeUser.role == 'upravnik') {
          this.router.navigate(['/dogadjajPregled']);
        } else {
          this.router.navigate(['/dogadjajPregled']); 
        }
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
