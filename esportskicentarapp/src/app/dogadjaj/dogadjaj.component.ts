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
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Ulaz } from '../models/ulaz';
import { UlazService } from '../ulaz/ulaz.service';
import { response } from 'express';
import { Takmicenje } from '../models/takmicenje';
import { TakmicenjeService } from '../takmicenje/takmicenje.service';

@Component({
  selector: 'app-dogadjaj',
  templateUrl: './dogadjaj.component.html',
  styleUrl: './dogadjaj.component.css',
  providers: [MessageService, CheckboxModule, TimelineModule, CardModule, ButtonModule]
})
export class DogadjajComponent {
  public dogadjajs: Dogadjaj[] = [];
  public sortedDogadjajs: Dogadjaj[] = [];
  addVisible: boolean = false;
  deleteVisible: boolean = false;

  public delDogadjaj: Dogadjaj | undefined;
  public delIdDogadjaj: number = -1;

  defaultDate: Date = new Date("January 31 1980 12:30");

  dnevniRasporeds: DnevniRaspored[] = [];
  dnevniRasporedsAsc: DnevniRaspored[] = [];
  selectedDnevniRaspored: DnevniRaspored | undefined;

  terens: Teren[] = [];
  selectedTeren: Teren | undefined;

  takmicenjes: Takmicenje[] = [];
  selectedTakmicenje: Takmicenje | undefined;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  ekipas: Ekipa[] = [];
  selectedDomacaEkipa: Ekipa | undefined;
  selectedGostujucaEkipa: Ekipa | undefined;

  selectedRaspored: Raspored | undefined;
  rasporeds: Raspored[] = [];

  danasnjiDatum: Date = new Date();
  selectedDatum: Date = new Date();
  earliestDate = new Date(-8640000000000000);

  isFilterDone: boolean = false;

  icon: string = "pi pi-ticket";

  cjn: number = 2;

  ulazs: Ulaz[] = [];

  constructor(private dogadjajService: DogadjajService, private dnevniRasporedService: DnevniRasporedService,
    private ekipaService: EkipaService, private terenService: TerenService, private dvoranaService: DvoranaService,
    private rasporedService: RasporedService, private ulazService: UlazService, private takmicenjeService: TakmicenjeService,
    private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getDogadjajs();
      this.getDnevniRasporeds();
      this.getEkipas();
      this.getTerens();
      this.getDvoranas();
      this.getRasporeds();
      this.getUlazs();
      this.getTakmicenjes();
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

  public getTakmicenjes(): void
  {
    this.takmicenjeService.getTakmicenjes().subscribe(
      (response: Takmicenje[]) => {
        this.takmicenjes = response;
      },
      (error: HttpErrorResponse) => {
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

  public async loadTerens(): Promise<void> {
    try {
      this.terens = await this.terenService.getTerens().toPromise() || [];
    } catch (error) {
      console.error('Greška pri učitavanju terena:', error);
    }
  }

  public async loadDnevniRasporeds(): Promise<void> {
    try {
      this.dnevniRasporedsAsc = await this.dnevniRasporedService.getDnevniRasporeds().toPromise() || [];
    } catch (error) {
      console.error('Greška pri učitavanju terena:', error);
    }
  }

  public async loadDogadjajs(): Promise<void> 
  {
    try{
      this.dogadjajs = await this.dogadjajService.getDogadjajs().toPromise() || [];
    } catch(error)
    {
      console.log('Greska pri ucitavanju dogadjaja');
    }
  }
  

  public async onDvoranaChange(event: any) {
    console.log(this.selectedDvorana?.nazivDvorane);
    await this.loadTerens();
    this.filterTerens();
  }

  public async onStartFilter()
  {
    await this.loadDogadjajs();
    console.log(this.dogadjajs);
  }

  public async onRasporedSelected()
  {
    await this.loadDnevniRasporeds();
  }

  public async onTerenChange(event: any) {
    console.log(this.selectedTeren?.nazivTerena);
    this.isFilterDone = false;
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
      console.log(this.selectedTeren?.idTeren);
      if(dogadjaj.teren.idTeren == this.selectedTeren?.idTeren && dogadjaj.dnevniRaspored.idDnevniRaspored == this.selectedDnevniRaspored?.idDnevniRaspored)
      //if(dogadjaj.teren.idTeren == this.selectedTeren?.idTeren)
      {
        filterDogadjajs.push(dogadjaj);
      }
    }
    this.dogadjajs = filterDogadjajs;
  }

  public filterUlazs(): void
  {
    let filterUlazs: Ulaz[] = [];
    for(const ulaz of this.ulazs)
    {
      if(ulaz.dvorana.idDvorana == this.selectedTeren?.dvorana.idDvorana && ulaz.dostupan)
      {
        filterUlazs.push(ulaz);
      }
    }
    this.ulazs = filterUlazs;
  }

  public filtriraj(): void
  {
      this.onStartFilter();
      let postojiDnevniRaspored : boolean = false;
      for(const dnevniRaspored of this.dnevniRasporeds)
      {
        if(this.compareDates(dnevniRaspored.datum, this.selectedDatum))
        {
          console.log(dnevniRaspored.datum, this.selectedDatum);
          postojiDnevniRaspored = true;
          this.selectedDnevniRaspored = dnevniRaspored;
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
          (response: DnevniRaspored) => {
            console.log('API response:', response); 
            //this.selectedDnevniRaspored = response;
            this.getDnevniRasporeds();
            this.setDnevniRaspored(response);
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      //pronaci odgovarajuci raspored
      console.log("---" + this.selectedDnevniRaspored)
      this.filterDogadjajs();
      this.filterUlazs();
      this.sortDogadjajs();
      this.isFilterDone = true;
  }

  setDnevniRaspored(dnevniRaspored: DnevniRaspored): void
  {
    this.selectedDnevniRaspored = dnevniRaspored;
    console.log('---', this.selectedDnevniRaspored);
    
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
      const [day, month, year] = date1.split('.').map(Number);
      date1 = new Date(year, month - 1, day);
    }
    if (!(date2 instanceof Date)) {
      const [day, month, year] = date2.split('.').map(Number);
      date2 = new Date(year, month - 1, day);
    }
    console.log(date1, date2);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      (date1.getDate() + 1) === date2.getDate()
    );
  }

  public sortDogadjajs(): void {
    this.sortedDogadjajs = this.dogadjajs.sort((a, b) => {
        const timeA = a.vrijemeOd.split(':').map(Number);
        const timeB = b.vrijemeOd.split(':').map(Number);
        
        const dateA = new Date(0, 0, 0, timeA[0], timeA[1], timeA[2]);
        const dateB = new Date(0, 0, 0, timeB[0], timeB[1], timeB[2]);

        return dateA.getTime() - dateB.getTime();
    });
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
    addForm.form.get('dnevniRaspored')?.setValue(this.selectedDnevniRaspored);
    this.dogadjajService.addDogadjaj(addForm.value).subscribe(
      (response: Dogadjaj) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dogadjaj je dodan u sistem!' });
        this.getDogadjajs();
        window.location.reload();
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

