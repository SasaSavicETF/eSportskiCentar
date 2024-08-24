import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Raspored } from '../models/raspored';
import { RasporedService } from './raspored.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrl: './raspored.component.css',
  providers: [MessageService]
})
export class RasporedComponent implements OnInit
{
  public rasporeds: Raspored[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;

  public editRaspored: Raspored | undefined;
  public delRaspored: Raspored | undefined;
  public delIdRaspored: number | undefined;

  public tipRasporedInput: string = "";

  constructor(private rasporedService: RasporedService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
    this.getRasporeds();
  }

  public getRasporeds(): void
  {
    this.rasporedService.getRasporeds().subscribe(
      (response: Raspored[]) =>
      {
        this.rasporeds = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddRaspored(addForm: NgForm): void
  {
    this.addVisible = false;
    this.rasporedService.addRaspored(addForm.value).subscribe(
      (response: Raspored) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Raspored je dodan u sistem!' });
        this.getRasporeds();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju rasporeda' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateRaspored(raspored: Raspored): void
  {
    this.editVisible = false;
    this.rasporedService.updateRaspored(raspored).subscribe(
      (response: Raspored) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Raspored je izmjenjen!' });
        this.getRasporeds();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni rasporeda' });
        alert(error.message);
      }
    );
  }
/*
  public onDeleteRaspored(idRaspored: number | undefined): void
  {
    this.deleteVisible = false;

    this.rasporedService.deleteRaspored(idRaspored).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Raspored je obrisan sa sistema!' });
        this.getRasporeds();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju rasporeda' });
        alert(error.message);
      }
    );
  }*/
    public onDeleteRaspored(idRaspored: number | undefined): void {
      if (idRaspored !== undefined) {
          // Ako je idRaspored definisan, pozovi deleteRaspored
          this.deleteVisible = false;
  
          this.rasporedService.deleteRaspored(idRaspored).subscribe(
              (response: void) => {
                  this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Raspored je obrisan sa sistema!' });
                  this.getRasporeds();
              },
              (error: HttpErrorResponse) => {
                  this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju rasporeda' });
                  alert(error.message);
              }
          );
      } else {
          // Ako idRaspored nije definisan, možeš obavestiti korisnika ili obaviti neku drugu akciju
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'ID rasporeda nije definisan' });
          console.error('ID rasporeda nije definisan');
      }
  }
  

  public searchRasporeds(key: string): void
  {
    const results: Raspored[] = [];
    for(const raspored of this.rasporeds)
    {
      if(raspored.tipRasporeda.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(raspored);
      }
    }
    this.rasporeds = results;
    if(!key)
    {
      this.getRasporeds();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(raspored: Raspored) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editRaspored = { ...raspored };
    }
  }

  showDeleteDialog(raspored: Raspored) 
  {
    this.deleteVisible = true;
    this.delRaspored = { ...raspored };
    this.delIdRaspored = this.delRaspored.idRaspored;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
