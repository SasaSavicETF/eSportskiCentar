import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TipTerena } from '../models/tipTerena';
import { TipTerenaService } from './tip-terena.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tip-terena',
  templateUrl: './tip-terena.component.html',
  styleUrl: './tip-terena.component.css',
  providers: [MessageService]
})
export class TipTerenaComponent implements OnInit
{
  public tipTerenas: TipTerena[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editTipTerena: TipTerena | undefined;
  public delTipTerena: TipTerena | undefined;
  public infoTipTerena: TipTerena | undefined;
  public delIdTipTerena: number = -1;

  public nazivTipTerenaInput: string = "";

  constructor(private tipTerenaService: TipTerenaService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getTipTerenas();
  }

  public getTipTerenas(): void
  {
    this.tipTerenaService.getTipTerenas().subscribe(
      (response: TipTerena[]) => 
      {
        this.tipTerenas = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddTipTerena(addForm: NgForm): void
  {
    this.addVisible = false;
    this.tipTerenaService.addTipTerena(addForm.value).subscribe(
      (response: TipTerena) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Tip terena je dodan u sistem!' });
        this.getTipTerenas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju tipa terena' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateTipTerena(tipTerena: TipTerena): void
  {
    this.editVisible = false;
    this.tipTerenaService.updateTipTerena(tipTerena).subscribe(
      (response: TipTerena) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Tip terena je izmjenjen!' });
        this.getTipTerenas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni tipa terena' });
        alert(error.message);
      }
    );
  }

  public onDeleteTipTerena(idTipTerena: number): void
  {
    this.deleteVisible = false;
    this.tipTerenaService.deleteTipTerena(idTipTerena).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Tip terena je obrisan sa sistema!' });
        this.getTipTerenas();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju tipa terena' });
        alert(error.message);
      }
    );
  }

  public searchTipTerenas(key: string): void
  {
    const results: TipTerena[] = [];
    for(const tipTerena of this.tipTerenas)
    {
      if(tipTerena.nazivTipaTerena.toLowerCase().indexOf(key.toLowerCase()))
      {
        results.push(tipTerena);
      }
    }
    this.tipTerenas = results;
    if(!key)
    {
      this.getTipTerenas();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(tipTerena: TipTerena) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editTipTerena = { ...tipTerena };
    }
  }

  showDeleteDialog(tipTerena: TipTerena) 
  {
    this.deleteVisible = true;
    this.delTipTerena = { ...tipTerena };
    this.delIdTipTerena = this.delTipTerena.idTipTerena;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

  showInfoDialog(tipTerena: TipTerena) 
  {
    this.infoVisible = true;
    this.infoTipTerena = { ...tipTerena };
  }

  closeInfoDialog()
  {
    this.infoVisible = false;
  }
}
