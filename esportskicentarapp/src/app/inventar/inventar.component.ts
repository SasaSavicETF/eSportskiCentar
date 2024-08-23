import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Inventar } from '../models/inventar';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { InventarService } from './inventar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dvorana } from '../models/dvorana';
import { DvoranaService } from '../dvorana/dvorana.service';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-inventar',
  templateUrl: './inventar.component.html',
  styleUrl: './inventar.component.css',
  providers: [MessageService, CheckboxModule]
})
export class InventarComponent {
  public inventars: Inventar[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editInventar: Inventar | undefined;
  public delInventar: Inventar | undefined;
  public infoInventar: Inventar | undefined;
  public delIdInventar: number = -1;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  constructor(private inventarService: InventarService, private dvoranaService: DvoranaService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getInventars();
      this.getDvoranas();
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

  public getInventars(): void
  {
    this.inventarService.getInventars().subscribe(
      (response: Inventar[]) => 
      {
        this.inventars = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddInventar(addForm: NgForm): void
  {
    this.addVisible = false;
    this.inventarService.addInventar(addForm.value).subscribe(
      (response: Inventar) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Inventar je dodan u sistem!' });
        this.getInventars();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju inventara' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateInventar(inventar: Inventar): void
  {
    this.editVisible = false;
    this.inventarService.updateInventar(inventar).subscribe(
      (response: Inventar) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Inventar je izmjenjen!' });
        this.getInventars();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni inventara' });
        alert(error.message);
      }
    );
  }

  public onDeleteInventar(idInventar: number): void
  {
    this.deleteVisible = false;
    this.inventarService.deleteInventar(idInventar).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Inventar je obrisan sa sistema!' });
        this.getInventars();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju inventara' });
        alert(error.message);
      }
    );
  }

  public searchInventars(key: string): void
  {
    const results: Inventar[] = [];
    for(const inventar of this.inventars)
    {
      if((inventar.dvorana.nazivDvorane.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(inventar);
      }
    }
    this.inventars = results;
    if(!key)
    {
      this.getInventars();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(inventar: Inventar) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editInventar = { ...inventar };
      this.selectedDvorana = this.editInventar.dvorana;
    }
  }

  showDeleteDialog(inventar: Inventar) 
  {
    this.deleteVisible = true;
    this.delInventar = { ...inventar };
    this.delIdInventar = this.delInventar.idInventar;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
