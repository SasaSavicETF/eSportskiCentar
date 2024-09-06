import { Component, OnInit } from '@angular/core';
import { Administrator } from '../models/administrator';
import { DezurniRadnik } from '../models/dezurniRadnik';
import { Upravnik } from '../models/upravnik';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AdministratorService } from './administrator.service';
import { DezurniRadnikService } from '../dezurni-radnik/dezurni-radnik.service';
import { UpravnikService } from '../upravnik/upravnik.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dvorana } from '../models/dvorana';
import { DvoranaService } from '../dvorana/dvorana.service';
import { Klijent } from '../models/klijent';
import { KlijentService } from '../services/klijent.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css',
  providers: [MessageService]
})
export class AdministratorComponent implements OnInit {
    public administrators: Administrator[] = [];
    public dezurniRadniks: DezurniRadnik[] = []; 
    public upravniks: Upravnik[] = [];  
    public dvoranas: Dvorana[] = []; 
    public allAccounts: any[] = []; 

    public currentUser: Klijent | null = null; 
    
    addVisible: boolean = false; 
    infoAdministratorDialogVisible: boolean = false; 
    updateDezurniRadnikDialogVisible: boolean = false; 
    updateUpravnikDialogVisible: boolean = false; 
    deleteDialogVisible: boolean = false; 
    blockDialogVisible: boolean = false; 

    public administratorInfo: Administrator | undefined;
    public updateDezurniRadnik: DezurniRadnik | undefined;
    public updateUpravnik: Upravnik | undefined;

    public accountToDelete: any | undefined;
    public deleteIdAccount: number = -1;  

    public accountToBlock: any | undefined;
    public blockIdAccount: number = -1; 
    public accountBlocked: boolean = false; 

    public showPassword: boolean = true; 
    public iconType: boolean = false; 

    public accountChoices = [
      { label: 'Administrator', value: 'Administrator' },
      { label: 'Dežurni radnik', value: 'Dežurni radnik' },
      { label: 'Upravnik', value: 'Upravnik'}
    ];
    public selectedAccount: { label: string, value: string } | undefined;
    public selectedDvorana: Dvorana | undefined;

    constructor(private adminstratorService: AdministratorService, private dezurniRadnikService: DezurniRadnikService, 
      private upravnikService: UpravnikService, private messageService: MessageService,
      private dvoranaService: DvoranaService) {}

    ngOnInit(): void {
      this.getAccounts(); 
      this.getDvoranas();  
      // Za pregled tabele: 
      this.allAccounts = [
        ...this.administrators, 
        ...this.dezurniRadniks, 
        ...this.upravniks
      ].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);
    }

    public getAccounts(): void {
      this.getAdministrators(); 
      this.getDezurniRadniks(); 
      this.getUpravniks(); 
      this.allAccounts = [
        ...this.administrators,
        ...this.dezurniRadniks,
        ...this.upravniks
      ].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);
    }

    public getAdministrators(): void {
      this.adminstratorService.getAdministrators().subscribe(
        (response: Administrator[]) => {
          this.administrators = response;
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: error.message });
        }
      );
    }

    public getDezurniRadniks(): void {
      this.dezurniRadnikService.getDezurniRadniks().subscribe(
        (response: DezurniRadnik[]) => {
          this.dezurniRadniks = response; 
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: error.message }); 
        }
      );
    }

    public getUpravniks(): void {
      this.upravnikService.getUpravniks().subscribe(
        (response: Upravnik[]) => {
          this.upravniks = response; 
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: error.message }); 
        }
      );
    }

    public getDvoranas(): void {
      this.dvoranaService.getDvoranas().subscribe(
        (response: Dvorana[]) => {
          this.dvoranas = response; 
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: error.message});
        }
      );
    }

    public showAddDialog() {
      this.addVisible = true; 
    }

    public showUpdateDialog(account: any) {
      if('idAdministrator' in account) {
        this.infoAdministratorDialogVisible = true; 
        this.administratorInfo = { ...account }; 
      } else if('idDezurniRadnik' in account) {
        this.updateDezurniRadnikDialogVisible = true; 
        this.updateDezurniRadnik = { ...account };
      } else if('idUpravnik' in account) {
        this.updateUpravnikDialogVisible = true; 
        this.updateUpravnik = { ...account }; 
        this.selectedDvorana = this.updateUpravnik?.dvorana;
      }
    }

    public showDeleteDialog(account: any) {
      this.accountToDelete = account;
      if('idAdministrator' in account) {
        this.deleteIdAccount = this.accountToDelete?.idAdministrator;
      } else if('idDezurniRadnik' in account) {
        this.deleteIdAccount = this.accountToDelete?.idDezurniRadnik;
      } else if('idUpravnik' in account) {
        this.deleteIdAccount = this.accountToDelete?.idUpravnik;
      }
      this.deleteDialogVisible = true;
    }

    public showBlockDialog(account: any) {
      this.accountToBlock = account; 
      if('idDezurniRadnik' in account) {
        this.blockIdAccount = this.accountToBlock?.idDezurniRadnik; 
      } else if('idUpravnik' in account) {
        this.blockIdAccount = this.accountToBlock?.idUpravnik;
      }
      this.blockDialogVisible = true;
    }

    public searchAccounts(key: string): void {
      const results: any[] = []; 
      for(const account of this.allAccounts) {
        if((account?.korisnickoIme.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
          (account?.ime.toLowerCase().indexOf(key.toLowerCase()) !== -1) || 
          (account?.prezime.toLowerCase().indexOf(key.toLowerCase()) !== -1)) {
            results.push(account);
        }
      }
      this.allAccounts = results;
      if(!key) {
        this.getAccounts();
      }
    }

    public onAddAccount(ngForm: NgForm): void {
      this.addVisible = false;
      //this.messageService.add({ severity: 'success', summary: 'Podaci', detail: `${administrator.ime}, ${administrator.prezime},
      //  ${administrator.korisnickoIme}, ${administrator.lozinka}, ${administrator.email}`});
      // this.messageService.add({ severity: 'success', summary: 'Podaci', detail: `${this.selectedAccount?.label}`});
      if(this.selectedAccount?.label == 'Administrator') {
        this.adminstratorService.addAdministrator(ngForm.value).subscribe(
          (response: Administrator) =>
          {
            this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Administrator je dodat u sistem!' });
            this.administrators.push(response); 
            this.allAccounts = [ ...this.administrators, ...this.dezurniRadniks, 
              ...this.upravniks ].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
            this.getAccounts(); 
          },
          (error: HttpErrorResponse) =>
          {
            this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju administratora.' });
          }
        );
      } else if(this.selectedAccount?.value == 'Dežurni radnik') {
        this.dezurniRadnikService.addDezurniRadnik(ngForm.value).subscribe(
          (response: DezurniRadnik) =>
          {
            this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dežurni radnik je dodat u sistem!' });
            this.dezurniRadniks.push(response); 
            this.allAccounts = [ ...this.administrators, ...this.dezurniRadniks, 
              ...this.upravniks ].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
            this.getAccounts(); 
          },
          (error: HttpErrorResponse) =>
          {
            this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju dežurnog radnika.' });
          }
        );
      } else {
        this.upravnikService.addUpravnik(ngForm.value).subscribe(
          (response: Upravnik) =>
          {
            this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Upravnik je dodat u sistem!' });
            this.upravniks.push(response); 
            this.allAccounts = [ ...this.administrators, ...this.dezurniRadniks, 
              ...this.upravniks ].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
            this.getAccounts(); 
          },
          (error: HttpErrorResponse) =>
          {
            this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju upravnika.' });
          }
        );
      }
    }

    public onUpdateDezurniRadnik(dezurniRadnik: DezurniRadnik): void {
      this.updateDezurniRadnikDialogVisible = false; 
      this.dezurniRadnikService.updateDezurniRadnik(dezurniRadnik).subscribe(
        (response: DezurniRadnik) => {
          this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Dežurni radnik je uspješno izmijenjen!'});
          this.dezurniRadniks = this.dezurniRadniks.map(dz => dz.idDezurniRadnik === response.idDezurniRadnik ? response : dz);
          this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
            ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
          this.getAccounts(); 
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni dežurnog radnika.' });
        }
      );
    }

    public onUpdateUpravnik(upravnik: Upravnik): void {
      this.updateUpravnikDialogVisible = false; 
      this.upravnikService.updateUpravnik(upravnik).subscribe(
        (response: Upravnik) => {
          this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Upravnik je uspješno izmijenjen!'});
          this.upravniks = this.upravniks.map(upravnik => upravnik.idUpravnik === response.idUpravnik ? response : upravnik);
          this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
            ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
          this.getAccounts();
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni upravnika.' });
        }
      );
    }

    public onDeleteAccount(accountId: number): void {
      this.deleteDialogVisible = false;
      if('idAdministrator' in this.accountToDelete) {
        this.adminstratorService.deleteAdministrator(accountId).subscribe(
          (response: void) => {
            this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Administrator je obrisan sa sistema!' });
            this.administrators = this.administrators.filter(admin => admin.idAdministrator !== accountId);
            this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
              ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju administratora.' });
          }
        );
      } else if('idDezurniRadnik' in this.accountToDelete) {
        this.dezurniRadnikService.deleteDezurniRadnik(accountId).subscribe(
          (response: void) => {
            this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Dežurni radnik je obrisan sa sistema!' });
            this.dezurniRadniks = this.dezurniRadniks.filter(dz => dz.idDezurniRadnik !== accountId);
            this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
              ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju dežurnog radnika.' });
          }
        );
      } else if('idUpravnik' in this.accountToDelete) {
        this.upravnikService.deleteUpravnik(accountId).subscribe(
          (response: void) => {
            this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Upravnik je obrisan sa sistema!' });
            this.upravniks = this.upravniks.filter(upravnik => upravnik.idUpravnik !== accountId);
            this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
              ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju upravnika.' });
          }
        );
      }
    }

    public onBlockAccount(): void {
      this.blockDialogVisible = false; 
      if('idDezurniRadnik' in this.accountToBlock) {
        if((this.accountToBlock as DezurniRadnik).blokiran == true) {
          (this.accountToBlock as DezurniRadnik).blokiran = false;
        } else {
          (this.accountToBlock as DezurniRadnik).blokiran = true;
        }

        // Nakon setovanja flag-a, ažuriramo radnika:
        this.onUpdateDezurniRadnik(this.accountToBlock as DezurniRadnik);
        if((this.accountToBlock as DezurniRadnik).blokiran) {
          this.messageService.add({ severity: 'success', summary: 'Uspješno blokiranje', detail: 'Dežurni radnik je blokiran!' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Uspješno odblokiranje', detail: 'Dežurni radnik je odblokiran!' });
        }
        

        // Resetovanje liste:
        this.getDezurniRadniks();
        this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
          ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
      } else if('idUpravnik' in this.accountToBlock) {
        if((this.accountToBlock as Upravnik).blokiran == true) {
          (this.accountToBlock as Upravnik).blokiran = false;
        } else {
          (this.accountToBlock as Upravnik).blokiran = true;
        }

         // Nakon setovanja flag-a, ažuriramo upravnika:
        this.onUpdateUpravnik(this.accountToBlock as Upravnik);
        if((this.accountToBlock as Upravnik).blokiran) {
          this.messageService.add({ severity: 'success', summary: 'Uspješno blokiranje', detail: 'Upravnik je blokiran!' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Uspješno odblokiranje', detail: 'Upravnik je odblokiran!' });
        }

        // Resetovanje liste: 
        this.getUpravniks();
        this.allAccounts = [...this.administrators, ...this.dezurniRadniks, 
          ...this.upravniks].filter(account => account.korisnickoIme !== this.currentUser?.korisnickoIme);;
      }
    }

    public closeDeleteDialog(): void {
      this.deleteDialogVisible = false; 
    }

    public closeBlockDialog(): void {
      this.blockDialogVisible = false; 
    }

    public closeInfoDialog(): void {
      this.infoAdministratorDialogVisible = false; 
    }

    public togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword; 
      this.iconType = !this.iconType; 
    }

    public isAdministrator(account: any): boolean {
      if('idAdministrator' in account) {
        return true; 
      } else {
        return false;
      }
    }

    public checkIfBlocked(account: any): boolean {
      if(account?.blokiran) {
        return true; 
      } else {
        return false; 
      }
    }
}
