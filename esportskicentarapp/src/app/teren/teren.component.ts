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
import { json } from 'stream/consumers';
import { KlijentService } from '../services/klijent.service';
import { UserDTO } from '../models/user-dto';

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

  ulazniKlijent: UserDTO | null = this.klijentService.activeUser;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  tipTerenas: TipTerena[] = [];
  selectedTipTerena: TipTerena | undefined;

  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private terenService: TerenService, private dvoranaService: DvoranaService, private klijentService: KlijentService,
    private tipTerenaService: TipTerenaService, private messageService: MessageService, private user: KlijentService) { }


  ngOnInit(): void 
  {
      this.getTerens();
      this.getDvoranas();
      this.getTipTerenas();
      console.log(this.user.activeUser)
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
        if(this.ulazniKlijent !== null && this.ulazniKlijent.role == 'upravnik')
          {
            const filteredDvoranas: Dvorana[] = [];
            for(let dvorana of response)
            {
              if(dvorana.idDvorana == this.ulazniKlijent.dvorana?.idDvorana)
              {
                filteredDvoranas.push(dvorana)
              }
            }
            this.dvoranas = filteredDvoranas
          }
          else
          {
            this.dvoranas = response;
          }
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
        if(this.ulazniKlijent !== null && this.ulazniKlijent.role == 'upravnik')
          {
            const filteredTerens: Teren[] = [];
            for(let teren of response)
            {
              if(teren.dvorana.idDvorana == this.ulazniKlijent.dvorana?.idDvorana)
              {
                filteredTerens.push(teren);
              }
            }
            this.terens = filteredTerens;
          }
          else
          {
            this.terens = response;
          }
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
    const teren: Teren = {
      idTeren: 0,
      nazivTerena: addForm.value.nazivTerena,
      info: addForm.value.info,
      duzina: addForm.value.duzina,
      sirina: addForm.value.sirina,
      dostupan: addForm.value.dostupan,
      dvorana: addForm.value.dvorana,
      tipTerena: addForm.value.tipTerena,
      slika: ''
    };
  
    if (this.selectedFile) {
      teren.slika = this.selectedFile.name;
      formData.append('image', this.selectedFile);
    }
    else{
      const emptyFile = new File([], "empty-file.txt", { type: "text/plain" });
      formData.append('image', emptyFile);
    }
    formData.append('teren', JSON.stringify(teren));
  
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
