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
  showNameError:boolean = true;
  showLastnameError:boolean = true;
  showPhoneNumberError: boolean = true;
  showPhonePatternError: boolean = true;
  showEmailError:boolean = true;
  showEmailPatternError:boolean = true;
  showUsernameError:boolean = true;
  showPasswordError: boolean = true;

  constructor(private router: Router, private klijentService: KlijentService) {}

  register(registerForm: NgForm) {
    if (this.name == null){
      this.showNameError = false;
      return;
    }
    this.showNameError = true;

    if (this.lastname == null){
      this.showLastnameError = false;
      return;
    }
    this.showLastnameError = true;

    if (this.username == null){
      this.showUsernameError = false;
      return;
    }
    this.showUsernameError = true;

    if (this.password == null){
      this.showPasswordError = false;
      return;
    }
    this.showPasswordError = true;

    if (this.phoneNumber == null){
      this.showPhoneNumberError = false;
      return;
    }
    this.showPhoneNumberError = true;
    const phoneNumberRegex = /^0\d{8}$/;
    if (!phoneNumberRegex.test(this.phoneNumber)){
      this.showPhonePatternError = false;
      return;
    }
    this.showPhonePatternError = true;

    if (this.email == null){
      this.showEmailError = false;
      return;
    }
    this.showEmailError = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)){
      this.showEmailPatternError = false;
      return;
    }
    this.showEmailPatternError = true;

    const user = new Klijent(this.name, this.lastname, this.username, this.password, this.phoneNumber, this.email, null);

    this.klijentService.registerUser(user).subscribe({
      next: response => {
            alert("Uspješno ste podnijeli zahtjev za registraciju!");
            registerForm.reset();
            this.router.navigate(['/login']);
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
