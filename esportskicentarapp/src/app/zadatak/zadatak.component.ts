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

  upravniks: Upravnik[] = [];
  selectedUpravnik: Upravnik | undefined;

  dezurniRadniks: DezurniRadnik[] = [];
  selectedDezurniRadnik: DezurniRadnik | undefined;

 //upravnik i dezurniradnikservice
  constructor(private zadatakService: ZadatakService, private upravnikService: UpravnikService,
    private dezurniRadnikService: DezurniRadnikService, private messageService: MessageService) { }


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
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
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
    this.setDatumKreiranja();
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

