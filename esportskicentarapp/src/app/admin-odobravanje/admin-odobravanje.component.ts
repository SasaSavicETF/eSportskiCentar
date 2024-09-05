import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { Dogadjaj } from '../models/dogadjaj';
import { DogadjajService } from '../dogadjaj/dogadjaj.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmailService } from '../services/email.service';
import { Email } from '../models/email';

@Component({
  selector: 'app-admin-odobravanje',
  templateUrl: './admin-odobravanje.component.html',
  styleUrl: './admin-odobravanje.component.css',
  providers: [CardModule, MessageService]
})
export class AdminOdobravanjeComponent implements OnInit
{
  public dogadjajs: Dogadjaj[] = [];
  public allDogadjajs: Dogadjaj[] = [];

  constructor(private dogadjajService: DogadjajService, private messageService: MessageService, private emailService: EmailService) { }

  ngOnInit(): void 
  {
    this.loadDogadjajs();
    this.getDogadjajs();
  }

  public getDogadjajs(): void
  {
    this.dogadjajService.getDogadjajs().subscribe(
      (response: Dogadjaj[]) => {
        this.allDogadjajs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public async loadDogadjajs(): Promise<void>
  {
    try
    {
      this.dogadjajs = await this.dogadjajService.getDogadjajs().toPromise() || [];
      const filteredDogadjajs: Dogadjaj[] = [];
      for(let dog of this.dogadjajs)
      {
        if(dog.odobren == false)
        {
          filteredDogadjajs.push(dog);
        }
      }
      this.dogadjajs = filteredDogadjajs;
    }
    catch(error)
    {
      console.log(error);
    }
  }

  //LOGIKA ZA IZMJENU DOZVOLE

  public onUpdateDogadjaj(dogadjaj: Dogadjaj): void 
  {
    dogadjaj.odobren = true;

    this.dogadjajService.updateDogadjaj(dogadjaj).subscribe(
      (response: Dogadjaj) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Dogadjaj je odobren' });
        console.log('EMAIL ', response.klijent.email);
        if(response.klijent.email !== null)
        {
          const email = new Email(response.klijent.email, `Vaša rezervacija događaja za teren ${response.teren.nazivTerena} za datum ${this.dateToString(this.normalizeDate(this.stringToDate(response.dnevniRaspored.datum)))} je odobrena! \nZa detaljnije informacije, pogledajte stranicu Moji događaji unutar web aplikacije.`);

          this.emailService.sendEmail(email).subscribe(response => {
            console.log('Email sent.');
          });
        }
        this.loadDogadjajs();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u odobravanju dogadjaja' });
      }
    );
  }

  //LOGIKA ZA BRISANJE

  //OBE UKLJUCUJU SLANJE MEJLA

  public checkTimeDogadjaj(dogadjaj: Dogadjaj): boolean
  {
    for (let dogadjajLst of this.allDogadjajs) {
      if (dogadjaj.dnevniRaspored.idDnevniRaspored === dogadjajLst.dnevniRaspored.idDnevniRaspored && dogadjajLst.odobren) {
        if (
          (dogadjaj.vrijemeOd >= dogadjajLst.vrijemeOd && dogadjaj.vrijemeOd < dogadjajLst.vrijemeDo) ||
          (dogadjaj.vrijemeDo > dogadjajLst.vrijemeOd && dogadjaj.vrijemeDo <= dogadjajLst.vrijemeDo) ||
          (dogadjaj.vrijemeOd <= dogadjajLst.vrijemeOd && dogadjaj.vrijemeDo >= dogadjajLst.vrijemeDo)
        ) {
          return false;
        }
      }
    }
    return true;
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



  public normalizeDate(date1: Date): Date
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


}
