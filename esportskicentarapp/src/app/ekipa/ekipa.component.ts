import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ekipa } from '../models/ekipa';
import { Sport } from '../models/sport';
import { Takmicenje } from '../models/takmicenje';
import { EkipaService } from './ekipa.service';
import { SportService } from '../sport/sport.service';
import { TakmicenjeService } from '../takmicenje/takmicenje.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ekipa',
  templateUrl: './ekipa.component.html',
  styleUrl: './ekipa.component.css',
  providers: [MessageService]
})
export class EkipaComponent implements OnInit 
{
  public ekipas: Ekipa[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editEkipa: Ekipa | undefined;
  public delEkipa: Ekipa | undefined;
  public infoEkipa: Ekipa | undefined;
  public delIdEkipa: number = -1;

  public nazivEkipeInput: string = "";

  sports: Sport[] = [];
  selectedSport: Sport | undefined;

  takmicenjes: Takmicenje[] = [];
  selectedTakmicenje: Takmicenje | undefined;

  constructor(private ekipaService: EkipaService, private sportService: SportService, 
    private takmicenjeService: TakmicenjeService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getEkipas();
      this.getSports();
      this.getTakmicenjes();
  }

  public getSports(): void
  {
    this.sportService.getSports().subscribe(
      (response: Sport[]) =>
      {
        this.sports = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public getTakmicenjes(): void
  {
    this.takmicenjeService.getTakmicenjes().subscribe(
      (response: Takmicenje[]) =>
      {
        this.takmicenjes = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public getEkipas(): void
  {
    this.ekipaService.getEkipas().subscribe(
      (response: Ekipa[]) => 
      {
        this.ekipas = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddEkipa(addForm: NgForm): void
  {
    this.addVisible = false;
    this.ekipaService.addEkipa(addForm.value).subscribe(
      (response: Ekipa) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Ekipa je dodana u sistem!' });
        this.getEkipas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju ekipe' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateEkipa(ekipa: Ekipa): void
  {
    this.editVisible = false;
    this.ekipaService.updateEkipa(ekipa).subscribe(
      (response: Ekipa) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Ekipa je izmjenjena!' });
        this.getEkipas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni ekipe' });
        alert(error.message);
      }
    );
  }

  public onDeleteEkipa(idEkipa: number): void
  {
    this.deleteVisible = false;
    this.ekipaService.deleteEkipa(idEkipa).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Ekipa je obrisana sa sistema!' });
        this.getEkipas();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju ekipa' });
        alert(error.message);
      }
    );
  }

  public searchEkipas(key: string): void
  {
    const results: Ekipa[] = [];
    for(const ekipa of this.ekipas)
    {
      if((ekipa.nazivEkipe.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (ekipa.sport.nazivSporta.toLowerCase().indexOf(key.toLowerCase()) !== -1) || 
        ekipa.takmicenje.vrstaTakmicenja.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      {
        results.push(ekipa);
      }
    }
    this.ekipas = results;
    if(!key)
    {
      this.getEkipas();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(ekipa: Ekipa) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editEkipa = { ...ekipa };
      this.selectedSport = this.editEkipa.sport;
      this.selectedTakmicenje = this.editEkipa.takmicenje;
    }
  }

  showDeleteDialog(ekipa: Ekipa) 
  {
    this.deleteVisible = true;
    this.delEkipa = { ...ekipa };
    this.delIdEkipa = this.delEkipa.idEkipa;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
