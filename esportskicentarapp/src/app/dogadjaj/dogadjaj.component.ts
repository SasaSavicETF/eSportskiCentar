import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Dogadjaj } from '../models/dogadjaj';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { DogadjajService } from './dogadjaj.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DnevniRaspored } from '../models/dnevniRaspored';
import { CheckboxModule } from 'primeng/checkbox';
import { DnevniRasporedService } from '../dnevni-raspored/dnevni-raspored.service';
import { EkipaService } from '../ekipa/ekipa.service';
import { TerenService } from '../teren/teren.service';
import { Teren } from '../models/teren';
import { Ekipa } from '../models/ekipa';
import { Dvorana } from '../models/dvorana';
import { DvoranaService } from '../dvorana/dvorana.service';
import { RasporedService } from '../raspored/raspored.service';
import { Raspored } from '../models/raspored';

@Component({
  selector: 'app-dogadjaj',
  templateUrl: './dogadjaj.component.html',
  styleUrl: './dogadjaj.component.css',
  providers: [MessageService, CheckboxModule]
})
export class DogadjajComponent {
  public dogadjajs: Dogadjaj[] = [];
  addVisible: boolean = false;
  deleteVisible: boolean = false;

  public delDogadjaj: Dogadjaj | undefined;
  public delIdDogadjaj: number = -1;

  defaultDate: Date = new Date("January 31 1980 12:30");

  dnevniRasporeds: DnevniRaspored[] = [];
  selectedDnevniRaspored: DnevniRaspored | undefined;

  terens: Teren[] = [];
  selectedTeren: Teren | undefined;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  ekipas: Ekipa[] = [];
  selectedDomacaEkipa: Ekipa | undefined;
  selectedGostujucaEkipa: Ekipa | undefined;

  selectedRaspored: Raspored | undefined;
  rasporeds: Raspored[] = [];

  danasnjiDatum: Date = new Date();
  selectedDatum: Date = new Date();

  constructor(private dogadjajService: DogadjajService, private dnevniRasporedService: DnevniRasporedService,
    private ekipaService: EkipaService, private terenService: TerenService, private dvoranaService: DvoranaService,
    private rasporedService: RasporedService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getDogadjajs();
      this.getDnevniRasporeds();
      this.getEkipas();
      this.getTerens();
      this.getDvoranas();
      this.getRasporeds();
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

  public getDogadjajs(): void
  {
    this.dogadjajService.getDogadjajs().subscribe(
      (response: Dogadjaj[]) => 
      {
        this.dogadjajs = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
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

  public async loadTerens(): Promise<void> {
    try {
      this.terens = await this.terenService.getTerens().toPromise() || [];
    } catch (error) {
      console.error('Greška pri učitavanju terena:', error);
    }
  }
  

  public async onDvoranaChange(event: any) {
    console.log(this.selectedDvorana?.nazivDvorane);
    await this.loadTerens();
    this.filterTerens();
  }

  public onDateSelect(event: any): void {
    if (typeof event === 'string') {
      this.selectedDatum = new Date(event);
    } else if (event instanceof Date) {
      this.selectedDatum = event;
    }
  }
    

  public filterTerens(): void
  {
    let filteredTerens: Teren[] = [];
    for(const teren of this.terens)
    {
      console.log(teren.dvorana.idDvorana + " - " + this.selectedDvorana?.idDvorana);
      if(teren.dvorana.idDvorana == this.selectedDvorana?.idDvorana)
      {
        filteredTerens.push(teren);
      }
    }
    this.terens = filteredTerens;
  }

  public filterDogadjajs(): void
  {
    let filterDogadjajs: Dogadjaj[] = [];
    for(const dogadjaj of this.dogadjajs)
    {
      if(dogadjaj.teren.idTeren == this.selectedTeren?.idTeren && dogadjaj.dnevniRaspored.idDnevniRaspored == this.selectedDnevniRaspored?.idDnevniRaspored)
      {
        filterDogadjajs.push(dogadjaj);
      }
    }
    this.dogadjajs = filterDogadjajs;
  }

  public filtriraj(): void
  {
      let postojiDnevniRaspored : boolean = false;
      for(const dnevniRaspored of this.dnevniRasporeds)
      {
        if(this.compareDates(dnevniRaspored.datum, this.selectedDatum))
        {
          postojiDnevniRaspored = true;
          break;
        }
      }
      if(!postojiDnevniRaspored)
      {
        
        if(this.rasporeds.length === 0)
        {
          this.rasporedService.addRaspored({tipRasporeda: 'Automatski'}).subscribe(
            (response: Raspored) =>
            {
              this.getRasporeds();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
        let jsonDatum = this.formatDate(this.selectedDatum);
        let jsonRaspored = JSON.stringify(this.rasporeds[0]);
        
        this.dnevniRasporedService.addDnevniRasporedJSON(`{ "datum": "${jsonDatum}", "raspored":{ "idRaspored": ${this.rasporeds[0].idRaspored}}}`).subscribe(
          (respnse: DnevniRaspored) => {
            this.getDnevniRasporeds();
            this.selectedDnevniRaspored = respnse;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      this.filterDogadjajs();
  }

  public formatDate(date: Date | null | undefined): string {
    // Proveri da li je prosleđeni datum validan
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Prosleđeni argument nije validan datum:', date);
      return 'N/A'; // Ili neki drugi defaultni odgovor
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // meseci su 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Format: "26.08.2024"
  }
  
/*
  public formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // meseci su 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Format: "26.08.2024"
  }*/
  public compareDates(date1: any, date2: any): boolean {
    if (!(date1 instanceof Date)) {
      date1 = new Date(date1);
    }
    if (!(date2 instanceof Date)) {
      date2 = new Date(date2);
    }
    
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  
/*

  public compareDates(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&  // Imajte na umu da je `getMonth()` zero-based (januar je 0, decembar je 11)
      date1.getDate() === date2.getDate()
    );
  }*/

  public onAddDogadjaj(addForm: NgForm): void
  {
    this.addVisible = false;
    this.dogadjajService.addDogadjaj(addForm.value).subscribe(
      (response: Dogadjaj) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dogadjaj je dodan u sistem!' });
        this.getDogadjajs();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju dogadjaja' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  /*
  public onUpdateDogadjaj(dogadjaj: Dogadjaj): void
  {
    this.editVisible = false;
    this.dogadjajService.updateDogadjaj(dogadjaj).subscribe(
      (response: Dogadjaj) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Dogadjaj je izmjenjen!' });
        this.getDogadjajs();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni dogadjaja' });
        alert(error.message);
      }
    );
  }
  */


  public onDeleteDogadjaj(idDogadjaj: number): void
  {
    this.deleteVisible = false;
    this.dogadjajService.deleteDogadjaj(idDogadjaj).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Dogadjaj je obrisan sa sistema!' });
        this.getDogadjajs();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju dogadjaja' });
        alert(error.message);
      }
    );
  }

  public searchDogadjajs(key: string): void
  {
    const results: Dogadjaj[] = [];
    for(const dogadjaj of this.dogadjajs)
    {
      if((dogadjaj.domacaEkipa.nazivEkipe.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (dogadjaj.gostujucaEkipa.nazivEkipe.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (dogadjaj.teren.nazivTerena.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(dogadjaj);
      }
    }
    this.dogadjajs = results;
    if(!key)
    {
      this.getDogadjajs();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  /*
  showEditDialog(dogadjaj: Dogadjaj) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editDogadjaj = { ...dogadjaj };
      this.selectedDnevniRaspored = this.editDogadjaj.dnevniRaspored;
      this.selectedGostujucaEkipa = this.editDogadjaj.gostujucaEkipa;
      this.selectedDomacaEkipa = this.editDogadjaj.domacaEkipa;
      this.selectedTeren = this.editDogadjaj.teren;
    }
  }
    */

  showDeleteDialog(dogadjaj: Dogadjaj) 
  {
    this.deleteVisible = true;
    this.delDogadjaj = { ...dogadjaj };
    this.delIdDogadjaj = this.delDogadjaj.idDogadjaj;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}

