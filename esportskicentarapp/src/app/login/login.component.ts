import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username!: string;
  password!: string;
  showUsernameError:boolean = true;
  showPasswordError: boolean = true;

  constructor(private router : Router, private klijentService: KlijentService, 
            private encryptionService: EncryptionService){}

  login() {
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

    this.klijentService.loginUser(this.username, this.password).subscribe({
      next: response => {
        this.klijentService.activeUser = response;

        if (localStorage !== undefined){
          localStorage.removeItem('activeUser');
          this.klijentService.activeUser.expiry = new Date().getTime() + 1000*60*20; // 30 min
          const encryptedData = this.encryptionService.encryptData(this.klijentService.activeUser);
          localStorage.setItem('activeUser', encryptedData);
        }

        if(this.klijentService.activeUser.role == 'admin') {
          this.router.navigate(['/adminPanel']);
        } else if(this.klijentService.activeUser.role == 'radnik') {
          this.router.navigate(['/radnik/zadaci']);
        } else if(this.klijentService.activeUser.role == 'upravnik') {
          this.router.navigate(['/teren']);
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
