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
  public selectedOpcija = "";

  //public mainContentVisible: boolean = false;

  public danasnjiDatum: Date = new Date();


  constructor(private zadatakService: ZadatakService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
    //this.loadZadataks();
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
        zad.rokIzvrsenja = this.dateToString(DezurniRadnikIndexComponent.normalizeDate(this.stringToDate(zad.rokIzvrsenja)));
        zad.datumKreiranja = this.dateToString(DezurniRadnikIndexComponent.normalizeDate(this.stringToDate(zad.datumKreiranja)));
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

  public stringToDate(dateString: string): Date 
  {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day); // Mjeseci su 0-indeksirani u JavaScriptu
  }


  public dateToString(date: Date): string 
  {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mjeseci su 0-indeksirani u JavaScriptu
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  }



  public static normalizeDate(date1: Date): Date
  {
    let dan: number = date1.getDate();
    let mjesec: number = date1.getMonth();
    let godina: number = date1.getFullYear();

    if (date1.getMonth() == 1) 
    {
      if (date1.getDate() == 28) {
          if ((date1.getFullYear() % 4 == 0 && date1.getFullYear() % 100 != 0) || date1.getFullYear() % 400 == 0) {
            dan = 29;
          } else {
            dan = 1;
            mjesec = 2;
          }
      } else if (date1.getDate() == 29) {
          dan = 1;
          mjesec = 2;
      }
    }
    else if (date1.getDate() == 30 && (date1.getMonth() == 3 || date1.getMonth() == 5 || date1.getMonth() == 8 || date1.getMonth() == 10)) 
    {
      dan = 1;
      mjesec = date1.getMonth() + 1;
    }
    else if (date1.getDate() == 31) 
    {
      if (date1.getMonth() == 11) {
          dan = 1;
          mjesec = 0;
          godina = date1.getFullYear();
      } else {
        dan = 1;
        mjesec = date1.getMonth() + 1;
      }
    }
    else
    {
      dan = date1.getDate() + 1;
    }

    date1.setDate(dan);
    date1.setMonth(mjesec);
    date1.setFullYear(godina);

    return date1;
  }



  /*public filtriraj(): void
  {
    this.mainContentVisible = true;
  }*/
}
