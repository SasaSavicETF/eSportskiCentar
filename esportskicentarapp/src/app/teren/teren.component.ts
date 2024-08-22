import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Teren } from '../models/teren';
import { Dvorana } from '../models/dvorana';
import { TipTerena } from '../models/tipTerena';
import { TerenService } from './teren.service';
import { DvoranaService } from '../dvorana/dvorana.service';
import { TipTerenaService } from '../tip-terena/tip-terena.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-teren',
  templateUrl: './teren.component.html',
  styleUrl: './teren.component.css',
  providers: [MessageService, ImageModule, CheckboxModule]
})
export class TerenComponent implements OnInit 
{
  public terens: Teren[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editTeren: Teren | undefined;
  public delTeren: Teren | undefined;
  public infoTeren: Teren | undefined;
  public delIdTeren: number = -1;

  public nazivTerenInput: string = "";

  checkedAdd: boolean = false;
  checkedEdit: boolean = false;
  checkedInfo: boolean = false;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  tipTerenas: TipTerena[] = [];
  selectedTipTerena: TipTerena | undefined;

  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private terenService: TerenService, private dvoranaService: DvoranaService, 
    private tipTerenaService: TipTerenaService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getTerens();
      this.getDvoranas();
      this.getTipTerenas();
  }

  onFileSelected(event: any): void 
  {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.fileName = file.name;
    } else {
      console.error('Selected file is not an image.');
    }
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

  public getTerens(): void
  {
    this.terenService.getTerens().subscribe(
      (response: Teren[]) => 
      {
        this.terens = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddTeren(addForm: NgForm): void
  {
    /*
    this.addVisible = false;
    this.terenService.addTeren(addForm.value).subscribe(
      (response: Teren) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Teren je dodan u sistem!' });
        this.getTerens();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju terena' });
        alert(error.message);
      }
    );
    addForm.reset();
    */
    this.addVisible = false;

    // Kreirajte FormData objekat
    const formData = new FormData();
    formData.append('nazivTerena', addForm.value.nazivTerena);
    formData.append('info', addForm.value.info);
    formData.append('duzina', addForm.value.duzina);
    formData.append('sirina', addForm.value.sirina);
    formData.append('dostupan', String(addForm.value.dostupan));
    formData.append('dvorana', JSON.stringify(addForm.value.dvorana)); 
    formData.append('tipTerena', JSON.stringify(addForm.value.tipTerena)); 
  
    if (this.selectedFile) {
      formData.append('slikaFile', this.selectedFile, this.selectedFile.name);
    }
  
    // Pošaljite formData umesto JSON-a
    this.terenService.addTeren(formData).subscribe(
      (response: Teren) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Teren je dodan u sistem!' });
        this.getTerens();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju terena' });
        alert(error.message);
      }
    );
  
    addForm.reset();
  }

  public onUpdateTeren(teren: Teren): void
  {
    this.editVisible = false;
    this.terenService.updateTeren(teren).subscribe(
      (response: Teren) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Teren je izmjenjen!' });
        this.getTerens();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni terena' });
        alert(error.message);
      }
    );
  }

  public onDeleteTeren(idTeren: number): void
  {
    this.deleteVisible = false;
    this.terenService.deleteTeren(idTeren).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Teren je obrisan sa sistema!' });
        this.getTerens();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju terena' });
        alert(error.message);
      }
    );
  }

  public searchTerens(key: string): void
  {
    const results: Teren[] = [];
    for(const teren of this.terens)
    {
      if((teren.nazivTerena.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (teren.dvorana.nazivDvorane.toLowerCase().indexOf(key.toLowerCase()) !== -1) || 
        teren.tipTerena.nazivTipaTerena.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      {
        results.push(teren);
      }
    }
    this.terens = results;
    if(!key)
    {
      this.getTerens();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(teren: Teren) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editTeren = { ...teren };
      this.checkedEdit = teren.dostupan;
      this.selectedDvorana = this.editTeren.dvorana;
      this.selectedTipTerena = this.editTeren.tipTerena;
    }
  }

  showDeleteDialog(teren: Teren) 
  {
    this.deleteVisible = true;
    this.delTeren = { ...teren };
    this.delIdTeren = this.delTeren.idTeren;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

  showInfoDialog(teren: Teren) 
  {
    this.infoVisible = true;
    this.infoTeren = { ...teren };
  }

  closeInfoDialog()
  {
    this.infoVisible = false;
  }
}
