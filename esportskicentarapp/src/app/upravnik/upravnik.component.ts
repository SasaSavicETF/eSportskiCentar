import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Upravnik } from '../models/upravnik';
import { UpravnikService } from './upravnik.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-upravnik',
  templateUrl: './upravnik.component.html',
  styleUrl: './upravnik.component.css',
  providers: [MessageService, CheckboxModule]
})
export class UpravnikComponent {
  public upravniks: Upravnik[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editUpravnik: Upravnik | undefined;
  public delUpravnik: Upravnik | undefined;
  public infoUpravnik: Upravnik | undefined;
  public delIdUpravnik: number = -1;

  checkedAdd: boolean = false;
  checkedEdit: boolean = false;
  checkedInfo: boolean = false;


  constructor(private upravnikService: UpravnikService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getUpravniks();
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

  public onAddUpravnik(addForm: NgForm): void
  {
    this.addVisible = false;
    this.upravnikService.addUpravnik(addForm.value).subscribe(
      (response: Upravnik) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Upravnik je dodan u sistem!' });
        this.getUpravniks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju upravnika' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateUpravnik(upravnik: Upravnik): void
  {
    this.editVisible = false;
    this.upravnikService.updateUpravnik(upravnik).subscribe(
      (response: Upravnik) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Upravnik je izmjenjen!' });
        this.getUpravniks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni upravnika' });
        alert(error.message);
      }
    );
  }

  public onDeleteUpravnik(idUpravnik: number): void
  {
    this.deleteVisible = false;
    this.upravnikService.deleteUpravnik(idUpravnik).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Upravnik je obrisan sa sistema!' });
        this.getUpravniks();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju upravnika' });
        alert(error.message);
      }
    );
  }

  public searchUpravniks(key: string): void
  {
    const results: Upravnik[] = [];
    for(const upravnik of this.upravniks)
    {
      if((upravnik.ime.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (upravnik.prezime.toLowerCase().indexOf(key.toLowerCase()) !== -1) || 
        upravnik.korisnickoIme.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      {
        results.push(upravnik);
      }
    }
    this.upravniks = results;
    if(!key)
    {
      this.getUpravniks();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(upravnik: Upravnik) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editUpravnik = { ...upravnik };
      this.checkedEdit = upravnik.blokiran;
    }
  }

  showDeleteDialog(upravnik: Upravnik) 
  {
    this.deleteVisible = true;
    this.delUpravnik = { ...upravnik };
    this.delIdUpravnik = this.delUpravnik.idUpravnik;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

  showInfoDialog(upravnik: Upravnik) 
  {
    this.infoVisible = true;
    this.infoUpravnik = { ...upravnik };
  }

  closeInfoDialog()
  {
    this.infoVisible = false;
  }
}

