import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { AdministratorComponent } from '../administrator/administrator.component';

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
          this.router.navigate(['/administrator']);
        } else if(this.klijentService.activeUser.role == 'radnik') {
          // Potrebna ruta
        } else if(this.klijentService.activeUser.role == 'upravnik') {
          // Potrebna ruta
        } else {
          this.router.navigate(['/teren']); 
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
