import { Component, OnInit } from '@angular/core';
import { Zadatak } from '../models/zadatak';
import { ZadatakService } from '../zadatak/zadatak.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dezurni-radnik-index',
  templateUrl: './dezurni-radnik-index.component.html',
  styleUrl: './dezurni-radnik-index.component.css',
  providers: [CardModule, MessageService]
})
export class DezurniRadnikIndexComponent implements OnInit
{
  public zadataks: Zadatak[] = [];

  public opcijas: string[] = ['Svi', 'Zavrseni', 'Potrebno uraditi'];
  public selectedOpcija = this.opcijas[0];

  //public mainContentVisible: boolean = false;

  public danasnjiDatum: Date = new Date();


  constructor(private zadatakService: ZadatakService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
    this.getZadataks();
  }

  public getZadataks(): void
  {
    this.zadatakService.getZadataks().subscribe(
      (response: Zadatak[]) => 
      {
        this.zadataks = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public async onOpcijaChange(event: any)
  {
    await this.loadZadataks();
  }

  public async loadZadataks(): Promise<void>
  {
    try
    {
      this.zadataks = await this.zadatakService.getZadataks().toPromise() || [];
      const filteredZadataks: Zadatak[] = [];
      for(let zad of this.zadataks)
      {
        console.log(this.selectedOpcija);
        if(this.selectedOpcija == this.opcijas[0])
        {
          filteredZadataks.push(zad);
        }
        else if(this.selectedOpcija == this.opcijas[1] && zad.zavrsen)
        {
          filteredZadataks.push(zad);
        }
        else if(this.selectedOpcija == this.opcijas[2] && !zad.zavrsen)
        {
          filteredZadataks.push(zad);
        }
      }
      this.zadataks = filteredZadataks;
    }
    catch(error)
    {
      console.log(error);
    }
  }

  public parseDate(dateString: string) : Date
  {
    // Razdvajanje stringa na dan, mesec i godinu
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));

    // Kreiranje JavaScript Date objekta
    // Mesec se umanjuje za 1, jer JavaScript koristi 0-indeksirane mesece (januar = 0)
    return new Date(year, month - 1, day);
  }

  public onUpdateZadatak(zadatak: Zadatak, obavljen: boolean): void
  {
    zadatak.zavrsen = obavljen;
    this.zadatakService.updateZadatak(zadatak).subscribe(
      (response: Zadatak) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Zadatak je obavljen!' });
        this.loadZadataks();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u obavljanu zadatka' });
        alert(error.message);
      }
    );
  }



  /*public filtriraj(): void
  {
    this.mainContentVisible = true;
  }*/
}
