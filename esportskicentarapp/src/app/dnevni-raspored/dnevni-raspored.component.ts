import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DnevniRaspored } from '../models/dnevniRaspored';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { DnevniRasporedService } from './dnevni-raspored.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Raspored } from '../models/raspored';
import { RasporedService } from '../raspored/raspored.service';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-dnevni-raspored',
  templateUrl: './dnevni-raspored.component.html',
  styleUrl: './dnevni-raspored.component.css',
  providers: [MessageService, CheckboxModule]
})
export class DnevniRasporedComponent {

  public dnevniRasporeds: DnevniRaspored[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editDnevniRaspored: DnevniRaspored | undefined;
  public delDnevniRaspored: DnevniRaspored | undefined;
  public infoDnevniRaspored: DnevniRaspored | undefined;
  public delIdDnevniRaspored: number = -1;

  danasnjiDatum: Date = new Date();

  rasporeds: Raspored[] = [];
  selectedRaspored: Raspored | undefined;

  constructor(private dnevniRasporedService: DnevniRasporedService, private rasporedService: RasporedService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getDnevniRasporeds();
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

  public getDnevniRasporeds(): void
  {
    this.dnevniRasporedService.getDnevniRasporeds().subscribe(
      (response: DnevniRaspored[]) => 
      {
        this.dnevniRasporeds = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddDnevniRaspored(addForm: NgForm): void
  {
    this.addVisible = false;
    this.dnevniRasporedService.addDnevniRaspored(addForm.value).subscribe(
      (response: DnevniRaspored) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dnevni raspored je dodan u sistem!' });
        this.getDnevniRasporeds();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju dnevnog rasporeda' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateDnevniRaspored(dnevniRaspored: DnevniRaspored): void
  {
    this.editVisible = false;
    this.dnevniRasporedService.updateDnevniRaspored(dnevniRaspored).subscribe(
      (response: DnevniRaspored) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Dnevni raspored je izmjenjen!' });
        this.getDnevniRasporeds();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni dnevnog rasporeda' });
        alert(error.message);
      }
    );
  }

  public onDeleteDnevniRaspored(idDnevniRaspored: number): void
  {
    this.deleteVisible = false;
    this.dnevniRasporedService.deleteDnevniRaspored(idDnevniRaspored).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Dnevni raspored je obrisan sa sistema!' });
        this.getDnevniRasporeds();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju dnevnog rasporeda' });
        alert(error.message);
      }
    );
  }

  public searchDnevniRasporeds(key: string): void
  {
    const results: DnevniRaspored[] = [];
    for(const dnevniRaspored of this.dnevniRasporeds)
    {
      if((dnevniRaspored.raspored.tipRasporeda.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(dnevniRaspored);
      }
    }
    this.dnevniRasporeds = results;
    if(!key)
    {
      this.getDnevniRasporeds();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(dnevniRaspored: DnevniRaspored) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editDnevniRaspored = { ...dnevniRaspored };
      this.selectedRaspored = this.editDnevniRaspored.raspored;
    }
  }

  showDeleteDialog(dnevniRaspored: DnevniRaspored) 
  {
    this.deleteVisible = true;
    this.delDnevniRaspored = { ...dnevniRaspored };
    this.delIdDnevniRaspored = this.delDnevniRaspored.idDnevniRaspored;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
