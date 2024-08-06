import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Takmicenje } from '../models/takmicenje';
import { TakmicenjeService } from './takmicenje.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-takmicenje',
  templateUrl: './takmicenje.component.html',
  styleUrl: './takmicenje.component.css',
  providers: [MessageService]
})
export class TakmicenjeComponent implements OnInit
{
  public takmicenjes: Takmicenje[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;

  public editTakmicenje: Takmicenje | undefined;
  public delTakmicenje: Takmicenje | undefined;
  public delIdTakmicenje: number = -1;

  public vrstaTakmicenjaInput: string = "";

  constructor(private takmicenjeService: TakmicenjeService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
    this.getTakmicenjes();
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

  public onAddTakmicenje(addForm: NgForm): void
  {
    this.addVisible = false;
    this.takmicenjeService.addTakmicenje(addForm.value).subscribe(
      (response: Takmicenje) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Takmičenje je dodano u sistem!' });
        this.getTakmicenjes();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju takmičenja' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateTakmicenje(takmicenje: Takmicenje): void
  {
    this.editVisible = false;
    this.takmicenjeService.updateTakmicenje(takmicenje).subscribe(
      (response: Takmicenje) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Takmičenje je izmjenjeno!' });
        this.getTakmicenjes();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni takmičenja' });
        alert(error.message);
      }
    );
  }

  public onDeleteTakmicenje(idTakmicenje: number): void
  {
    this.deleteVisible = false;
    this.takmicenjeService.deleteTakmicenje(idTakmicenje).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Takmičenje je obrisano sa sistema!' });
        this.getTakmicenjes();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju takmičenja' });
        alert(error.message);
      }
    );
  }

  public searchTakmicenjes(key: string): void
  {
    const results: Takmicenje[] = [];
    for(const takmicenje of this.takmicenjes)
    {
      if(takmicenje.vrstaTakmicenja.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(takmicenje);
      }
    }
    this.takmicenjes = results;
    if(!key)
    {
      this.getTakmicenjes();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(takmicenje: Takmicenje) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editTakmicenje = { ...takmicenje };
    }
  }

  showDeleteDialog(takmicenje: Takmicenje) 
  {
    this.deleteVisible = true;
    this.delTakmicenje = { ...takmicenje };
    this.delIdTakmicenje = this.delTakmicenje.idTakmicenje;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
