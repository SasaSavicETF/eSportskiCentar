import { Component, OnInit } from '@angular/core';
import { Dvorana } from '../models/dvorana';
import { DvoranaService } from './dvorana.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Grad } from '../models/grad';
import { GradService } from '../grad/grad.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dvorana',
  templateUrl: './dvorana.component.html',
  styleUrl: './dvorana.component.css',
  providers: [MessageService]
})
export class DvoranaComponent implements OnInit
{
  public dvoranas: Dvorana[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editDvorana: Dvorana | undefined;
  public delDvorana: Dvorana | undefined;
  public infoDvorana: Dvorana | undefined;
  public delIdDvorana: number = -1;

  public nazivDvoraneInput: string = "";

  grads: Grad[] = [];
  selectedGrad: Grad | undefined;

  duzina: string = "";
  duzinaFormControl = new FormControl('', Validators.pattern('[0-9]+([.,][0-9]+)?'));

  constructor(private dvoranaService: DvoranaService, private gradService: GradService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getDvoranas();
      this.getGrads();
  }

  public getGrads(): void
  {
    this.gradService.getGrads().subscribe(
      (response: Grad[]) =>
      {
        this.grads = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public getDvoranas(): void
  {
    this.dvoranaService.getDvoranas().subscribe(
      (response: Dvorana[]) => 
      {
        this.dvoranas = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddDvorana(addForm: NgForm): void
  {
    this.addVisible = false;
    this.dvoranaService.addDvorana(addForm.value).subscribe(
      (response: Dvorana) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dvorana je dodata u sistem!' });
        this.getDvoranas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju dvorane' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateDvorana(dvorana: Dvorana): void
  {
    this.editVisible = false;
    this.dvoranaService.updateDvorana(dvorana).subscribe(
      (response: Dvorana) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Dvorana je izmjenjena!' });
        this.getDvoranas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni dvorane' });
        alert(error.message);
      }
    );
  }

  public onDeleteDvorana(idDvorana: number): void
  {
    this.deleteVisible = false;
    this.dvoranaService.deleteDvorana(idDvorana).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Dvorana je obrisana sa sistema!' });
        this.getDvoranas();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju dvorane' });
        alert(error.message);
      }
    );
  }

  public searchDvoranas(key: string): void
  {
    const results: Dvorana[] = [];
    for(const dvorana of this.dvoranas)
    {
      if((dvorana.nazivDvorane.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (dvorana.grad.nazivGrada.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(dvorana);
      }
    }
    this.dvoranas = results;
    if(!key)
    {
      this.getDvoranas();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(dvorana: Dvorana) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editDvorana = { ...dvorana };
      this.selectedGrad = this.editDvorana.grad;
    }
  }

  showDeleteDialog(dvorana: Dvorana) 
  {
    this.deleteVisible = true;
    this.delDvorana = { ...dvorana };
    this.delIdDvorana = this.delDvorana.idDvorana;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

  showInfoDialog(dvorana: Dvorana) 
  {
    this.infoVisible = true;
    this.infoDvorana = { ...dvorana };
  }

  closeInfoDialog()
  {
    this.infoVisible = false;
  }
}
