import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DezurniRadnik } from '../models/dezurniRadnik';
import { DezurniRadnikService } from './dezurni-radnik.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-dezurni-radnik',
  templateUrl: './dezurni-radnik.component.html',
  styleUrl: './dezurni-radnik.component.css',
  providers: [MessageService, CheckboxModule]
})
export class DezurniRadnikComponent {
  public dezurniRadniks: DezurniRadnik[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editDezurniRadnik: DezurniRadnik | undefined;
  public delDezurniRadnik: DezurniRadnik | undefined;
  public infoDezurniRadnik: DezurniRadnik | undefined;
  public delIdDezurniRadnik: number = -1;

  checkedAdd: boolean = false;
  checkedEdit: boolean = false;
  checkedInfo: boolean = false;


  constructor(private dezurniRadnikService: DezurniRadnikService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getDezurniRadniks();
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

  public onAddDezurniRadnik(addForm: NgForm): void
  {
    this.addVisible = false;
    this.dezurniRadnikService.addDezurniRadnik(addForm.value).subscribe(
      (response: DezurniRadnik) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'DezurniRadnik je dodan u sistem!' });
        this.getDezurniRadniks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju dezurniRadnika' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateDezurniRadnik(dezurniRadnik: DezurniRadnik): void
  {
    this.editVisible = false;
    this.dezurniRadnikService.updateDezurniRadnik(dezurniRadnik).subscribe(
      (response: DezurniRadnik) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'DezurniRadnik je izmjenjen!' });
        this.getDezurniRadniks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni dezurniRadnika' });
        alert(error.message);
      }
    );
  }

  public onDeleteDezurniRadnik(idDezurniRadnik: number): void
  {
    this.deleteVisible = false;
    this.dezurniRadnikService.deleteDezurniRadnik(idDezurniRadnik).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'DezurniRadnik je obrisan sa sistema!' });
        this.getDezurniRadniks();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju dezurniRadnika' });
        alert(error.message);
      }
    );
  }

  public searchDezurniRadniks(key: string): void
  {
    const results: DezurniRadnik[] = [];
    for(const dezurniRadnik of this.dezurniRadniks)
    {
      if((dezurniRadnik.ime.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (dezurniRadnik.prezime.toLowerCase().indexOf(key.toLowerCase()) !== -1) || 
        dezurniRadnik.korisnickoIme.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      {
        results.push(dezurniRadnik);
      }
    }
    this.dezurniRadniks = results;
    if(!key)
    {
      this.getDezurniRadniks();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(dezurniRadnik: DezurniRadnik) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editDezurniRadnik = { ...dezurniRadnik };
      this.checkedEdit = dezurniRadnik.blokiran;
    }
  }

  showDeleteDialog(dezurniRadnik: DezurniRadnik) 
  {
    this.deleteVisible = true;
    this.delDezurniRadnik = { ...dezurniRadnik };
    this.delIdDezurniRadnik = this.delDezurniRadnik.idDezurniRadnik;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

  showInfoDialog(dezurniRadnik: DezurniRadnik) 
  {
    this.infoVisible = true;
    this.infoDezurniRadnik = { ...dezurniRadnik };
  }

  closeInfoDialog()
  {
    this.infoVisible = false;
  }
}


