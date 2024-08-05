import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Sport } from '../models/sport';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SportService } from './sport.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css',
  providers: [MessageService]
})
export class SportComponent implements OnInit 
{
  public sports: Sport[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;

  public editSport: Sport | undefined;
  public delSport: Sport | undefined;
  public delIdSport: number = -1;

  public nazivSportaInput: string = "";

  duzina: string = "";
  duzinaFormControl = new FormControl('', Validators.pattern('[0-9]+([.,][0-9]+)?'));

  constructor(private sportService: SportService, private messageService: MessageService) { }
  
  ngOnInit(): void 
  {
    this.getSports();
  }

  public getSports(): void
  {
    this.sportService.getSports().subscribe(
      (response: Sport[]) => {
        this.sports = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSport(addForm: NgForm): void
  {
    this.addVisible = false;
    this.sportService.addSport(addForm.value).subscribe(
      (response: Sport) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Sport je dodan u sistem!' });
        this.getSports();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju sporta' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateSport(sport: Sport): void
  {
    this.editVisible = false;
    this.sportService.updateSport(sport).subscribe(
      (response: Sport) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Sport je izmjenjen!' });
        this.getSports();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni sporta' });
        alert(error.message);
      }
    );
  }

  public onDeleteSport(idSport: number): void
  {
    this.deleteVisible = false;
    this.sportService.deleteSport(idSport).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Sport je obrisan sa sistema!' });
        this.getSports();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju sporta' });
        alert(error.message);
      }
    );
  }

  public searchSports(key: string): void
  {
    const results: Sport[] = [];
    for(const sport of this.sports)
    {
      if(sport.nazivSporta.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(sport);
      }
    }
    this.sports = results;
    if(!key)
    {
      this.getSports();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(sport: Sport)
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editSport = { ...sport };
    }
  }

  showDeleteDialog(sport: Sport)
  {
    this.deleteVisible = true;
    this.delSport = { ...sport };
    this.delIdSport = this.delSport.idSport;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
