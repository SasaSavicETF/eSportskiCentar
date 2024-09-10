import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Zadatak } from '../models/zadatak';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Upravnik } from '../models/upravnik';
import { ZadatakService } from './zadatak.service';
import { DezurniRadnik } from '../models/dezurniRadnik';
import { UpravnikService } from '../upravnik/upravnik.service';
import { DezurniRadnikService } from '../dezurni-radnik/dezurni-radnik.service';
import { UserDTO } from '../models/user-dto';
import { KlijentService } from '../services/klijent.service';

@Component({
  selector: 'app-zadatak',
  templateUrl: './zadatak.component.html',
  styleUrl: './zadatak.component.css',
  providers: [MessageService]
})
export class ZadatakComponent implements OnInit{

  public zadataks: Zadatak[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editZadatak: Zadatak | undefined;
  public delZadatak: Zadatak | undefined;
  public infoZadatak: Zadatak | undefined;
  public delIdZadatak: number = -1;

  datumKreiranja: Date = new Date();

  ulazniKlijent: UserDTO | null = this.klijentService.activeUser;
  selectedUpravnikLogin: Upravnik | undefined;

  upravniks: Upravnik[] = [];
  selectedUpravnik: Upravnik | undefined;

  dezurniRadniks: DezurniRadnik[] = [];
  selectedDezurniRadnik: DezurniRadnik | undefined;

 //upravnik i dezurniradnikservice
  constructor(private zadatakService: ZadatakService, private upravnikService: UpravnikService,
    private dezurniRadnikService: DezurniRadnikService, private messageService: MessageService,
    private klijentService: KlijentService) 
    { }


  ngOnInit(): void 
  {
      this.getZadataks();
      this.getUpravniks();
      this.getDezurniRadniks();
  }

  public getUpravniks(): void
  {
    this.upravnikService.getUpravniks().subscribe(
      (response: Upravnik[]) =>
      {
        this.upravniks = response;
        this.findUpravnik();
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public findUpravnik(): void
  {
    for(let upravnik of this.upravniks)
    {
      if(this.ulazniKlijent?.id == upravnik.idUpravnik)
      {
        this.selectedUpravnikLogin = upravnik;
        break;
      }
    }
  }

  public getDezurniRadniks(): void
  {
    this.dezurniRadnikService.getDezurniRadniks().subscribe(
      (response: DezurniRadnik[]) =>
      {
        this.dezurniRadniks = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public getZadataks(): void
  {
    this.zadatakService.getZadataks().subscribe(
      (response: Zadatak[]) => 
      {
        this.zadataks = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddZadatak(addForm: NgForm): void
  {
    this.findUpravnik();
    this.setDatumKreiranja();
    addForm.form.get('upravnik')?.setValue(this.selectedUpravnikLogin);
    console.log(this.dateToString(this.datumKreiranja));
    addForm.form.get('datumKreiranja')?.setValue(this.dateToString(this.datumKreiranja));
    this.addVisible = false;
    this.zadatakService.addZadatak(addForm.value).subscribe(
      (response: Zadatak) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Zadatak je dodan u sistem!' });
        this.getZadataks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju zadataka' });
        alert(error.message);
      }
    );
    addForm.reset();
  }
  setDatumKreiranja() {
    this.datumKreiranja = new Date();
  }

  public onUpdateZadatak(zadatak: Zadatak): void
  {
    this.editVisible = false;
    this.zadatakService.updateZadatak(zadatak).subscribe(
      (response: Zadatak) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Zadatak je izmjenjen!' });
        this.getZadataks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni zadataka' });
        alert(error.message);
      }
    );
  }

  public onDeleteZadatak(idZadatak: number): void
  {
    this.deleteVisible = false;
    this.zadatakService.deleteZadatak(idZadatak).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Zadatak je obrisan sa sistema!' });
        this.getZadataks();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju zadataka' });
        alert(error.message);
      }
    );
  }

  public searchZadataks(key: string): void
  {
    const results: Zadatak[] = [];
    for(const zadatak of this.zadataks)
    {
      if((zadatak.dezurniRadnik.ime.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (zadatak.upravnik.ime.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(zadatak);
      }
    }
    this.zadataks = results;
    if(!key)
    {
      this.getZadataks();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(zadatak: Zadatak) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editZadatak = { ...zadatak };
      this.selectedUpravnik = this.editZadatak.upravnik;
      this.selectedDezurniRadnik = this.editZadatak.dezurniRadnik;
    }
  }

  showDeleteDialog(zadatak: Zadatak) 
  {
    this.deleteVisible = true;
    this.delZadatak = { ...zadatak };
    this.delIdZadatak = this.delZadatak.idZadatak;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

  public stringToDate(dateString: string): Date 
  {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day); // Mjeseci su 0-indeksirani u JavaScriptu
  }


  public dateToString(date: Date): string 
  {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mjeseci su 0-indeksirani u JavaScriptu
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  }



  public static normalizeDate(date1: Date): Date
  {
    let dan: number = date1.getDate();
    let mjesec: number = date1.getMonth();
    let godina: number = date1.getFullYear();

    if (date1.getMonth() == 1) 
    {
      if (date1.getDate() == 28) {
          if ((date1.getFullYear() % 4 == 0 && date1.getFullYear() % 100 != 0) || date1.getFullYear() % 400 == 0) {
            dan = 29;
          } else {
            dan = 1;
            mjesec = 2;
          }
      } else if (date1.getDate() == 29) {
          dan = 1;
          mjesec = 2;
      }
    }
    else if (date1.getDate() == 30 && (date1.getMonth() == 3 || date1.getMonth() == 5 || date1.getMonth() == 8 || date1.getMonth() == 10)) 
    {
      dan = 1;
      mjesec = date1.getMonth() + 1;
    }
    else if (date1.getDate() == 31) 
    {
      if (date1.getMonth() == 11) {
          dan = 1;
          mjesec = 0;
          godina = date1.getFullYear();
      } else {
        dan = 1;
        mjesec = date1.getMonth() + 1;
      }
    }
    else
    {
      dan = date1.getDate() + 1;
    }

    date1.setDate(dan);
    date1.setMonth(mjesec);
    date1.setFullYear(godina);

    return date1;
  }

  fixDate(d: string | undefined) {
    if(typeof d === 'undefined' || d === null)
      return;
   
    const parts = d.split('.');

    const day = parseInt(parts[0],10);
    const month = parseInt(parts[1],10);
    const year = parseInt(parts[2],10);

    if (month === 2) {
      if (day === 28) {
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
              return `29.02.${year}`;
          } else {
              return `01.03.${year}`;
          }
      } else if (day === 29) {
          return `01.03.${year}`;
      }
  }
  
  if (day === 30 && (month === 4 || month === 6 || month === 9 || month === 11)) {
      return `01.${String(month + 1).padStart(2, '0')}.${year}`;
  }

  if (day === 31) {
      if (month === 12) {
          return `01.01.${year + 1}`;
      } else {
          return `01.${String(month + 1).padStart(2, '0')}.${year}`;
      }
  }
    return (day+1).toString().padStart(2,'0') + "." + month.toString().padStart(2,'0') + "." + year;
  }
}

