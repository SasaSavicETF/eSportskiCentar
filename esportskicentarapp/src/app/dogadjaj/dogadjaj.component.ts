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

  danasnjiDatum: Date = new Date();

  constructor(private dogadjajService: DogadjajService, private dnevniRasporedService: DnevniRasporedService,
    private ekipaService: EkipaService, private terenService: TerenService, private dvoranaService: DvoranaService,
     private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getDogadjajs();
      this.getDnevniRasporeds();
      this.getEkipas();
      this.getTerens();
      this.getDvoranas();
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

  public filterTerens(): void
  {
    let filteredTerens: Teren[] = [];
    for(const teren of this.terens)
    {
      if(teren.dvorana.idDvorana === this.selectedDvorana?.idDvorana)
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
      if(dogadjaj.teren.idTeren === this.selectedTeren?.idTeren && dogadjaj.dnevniRaspored.idDnevniRaspored === this.selectedDnevniRaspored?.idDnevniRaspored)
      {
        filterDogadjajs.push(dogadjaj);
      }
    }
    this.dogadjajs = filterDogadjajs;
  }

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

