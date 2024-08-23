import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { Klijent } from '../models/klijent';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name!: string;
  lastname!: string;
  username!: string;
  password!: string;
  phoneNumber!: string;
  email!: string;

  constructor(private router: Router, private klijentService: KlijentService) {}

  register(registerForm: NgForm) {
    const user = new Klijent(this.name, this.lastname, this.username, this.password, this.phoneNumber, this.email, null);

    this.klijentService.registerUser(user).subscribe({
      next: response => {
            alert("Uspješno ste podnijeli zahtjev za registraciju!");
            registerForm.reset();
      },
      error: error => {
        alert("Uneseno korisničko ime je već zauzeto!");
      }
    });
  }


  login(){
    this.router.navigate(['/login']); 
  }

}
