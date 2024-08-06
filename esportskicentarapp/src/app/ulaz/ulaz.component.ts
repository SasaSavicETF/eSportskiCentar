import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ulaz } from '../models/ulaz';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UlazService } from './ulaz.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dvorana } from '../models/dvorana';
import { DvoranaService } from '../dvorana/dvorana.service';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-ulaz',
  templateUrl: './ulaz.component.html',
  styleUrl: './ulaz.component.css',
  providers: [MessageService, CheckboxModule]
})
export class UlazComponent implements OnInit
{
  public ulazs: Ulaz[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editUlaz: Ulaz | undefined;
  public delUlaz: Ulaz | undefined;
  public infoUlaz: Ulaz | undefined;
  public delIdUlaz: number = -1;

  public nazivUlazaInput: string = "";

  checkedAdd: boolean = false;
  checkedEdit: boolean = false;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  duzina: string = "";
  duzinaFormControl = new FormControl('', Validators.pattern('[0-9]+([.,][0-9]+)?'));

  constructor(private ulazService: UlazService, private dvoranaService: DvoranaService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getUlazs();
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

  public getUlazs(): void
  {
    this.ulazService.getUlazs().subscribe(
      (response: Ulaz[]) => 
      {
        this.ulazs = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddUlaz(addForm: NgForm): void
  {
    this.addVisible = false;
    this.ulazService.addUlaz(addForm.value).subscribe(
      (response: Ulaz) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Ulaz je dodan u sistem!' });
        this.getUlazs();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju ulaza' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateUlaz(ulaz: Ulaz): void
  {
    this.editVisible = false;
    this.ulazService.updateUlaz(ulaz).subscribe(
      (response: Ulaz) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Ulaz je izmjenjen!' });
        this.getUlazs();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni ulaza' });
        alert(error.message);
      }
    );
  }

  public onDeleteUlaz(idUlaz: number): void
  {
    this.deleteVisible = false;
    this.ulazService.deleteUlaz(idUlaz).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Ulaz je obrisan sa sistema!' });
        this.getUlazs();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju ulaza' });
        alert(error.message);
      }
    );
  }

  public searchUlazs(key: string): void
  {
    const results: Ulaz[] = [];
    for(const ulaz of this.ulazs)
    {
      if((ulaz.nazivUlaza.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (ulaz.dvorana.nazivDvorane.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(ulaz);
      }
    }
    this.ulazs = results;
    if(!key)
    {
      this.getUlazs();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(ulaz: Ulaz) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editUlaz = { ...ulaz };
      this.checkedEdit = ulaz.dostupan;
      this.selectedDvorana = this.editUlaz.dvorana;
    }
  }

  showDeleteDialog(ulaz: Ulaz) 
  {
    this.deleteVisible = true;
    this.delUlaz = { ...ulaz };
    this.delIdUlaz = this.delUlaz.idUlaz;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
