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
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Sport } from '../models/sport';
import { SportService } from '../sport/sport.service';
import { Cjenovnik } from '../models/cjenovnik';
import { CjenovnikService } from '../cjenovnik/cjenovnik.service';
import { Klijent } from '../models/klijent';
import { KlijentService } from '../services/klijent.service';
import { UserDTO } from '../models/user-dto';
import { EmailService } from '../services/email.service';
import { Email } from '../models/email';


@Component({
  selector: 'app-dogadjaj',
  templateUrl: './dogadjaj.component.html',
  styleUrl: './dogadjaj.component.css',
  providers: [MessageService, CheckboxModule, TimelineModule, CardModule, ButtonModule]
})
export class DogadjajComponent implements OnInit{
  isBrowser: boolean = true;

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

  sports: Sport[] = [];
  selectedSport: Sport | undefined;

  takmicenjes: Takmicenje[] = [];
  selectedTakmicenje: Takmicenje | undefined;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  ekipas: Ekipa[] = [];
  selectedDomacaEkipa: Ekipa | undefined;
  selectedGostujucaEkipa: Ekipa | undefined;

  selectedRaspored: Raspored | undefined;
  rasporeds: Raspored[] = [];


  ulazniKlijent: UserDTO | null = this.klijentService.activeUser;
  selectedKlijent: Klijent| null = null;
  

  //selectedKlijent: Klijent | null = this.klijentService.activeUser;
  klijentZaMail: string | null = null;


  danasnjiDatum: Date = new Date();
  selectedDatum: Date = new Date();
  earliestDate = new Date(-8640000000000000);

  isFilterDone: boolean = false;

  isOdobren: boolean = true;

  icon: string = "pi pi-ticket";

  cjn: number = 2;

  ulazs: Ulaz[] = [];

  cjenovniks: Cjenovnik[] = [];
  izracunataCijena: boolean = false;
  racunanjeVisible: boolean = true;
  tempVrijemeDo: string = "";
  tempVrijemeOd: string = "";
  cijena: number = 15;

  constructor(private dogadjajService: DogadjajService, private dnevniRasporedService: DnevniRasporedService,
    private ekipaService: EkipaService, private terenService: TerenService, private dvoranaService: DvoranaService,
    private rasporedService: RasporedService, private ulazService: UlazService, private takmicenjeService: TakmicenjeService,
    private sportService: SportService, private messageService: MessageService, private cjenovnikService: CjenovnikService,
    private klijentService: KlijentService, private emailService: EmailService, @Inject(PLATFORM_ID) private platformId: Object) 
    {
      this.isBrowser = isPlatformBrowser(this.platformId);
      console.log('Is platform browser:', this.isBrowser);
      console.log(this.klijentService.activeUser);
      if(this.ulazniKlijent !== null && this.ulazniKlijent.role == 'user')
      {
        this.selectedKlijent = new Klijent(this.ulazniKlijent?.ime || "", this.ulazniKlijent?.prezime || "", this.ulazniKlijent?.korisnickoIme || "", this.ulazniKlijent?.lozinka || "",
          this.ulazniKlijent?.brojTelefona || "", this.ulazniKlijent?.email || "", "klijent");
        this.selectedKlijent.idKlijent = this.ulazniKlijent.id;
        this.klijentZaMail = this.selectedKlijent?.email || "";
        console.log(this.klijentZaMail);
      }
    }


  ngOnInit(): void 
  {
    if (this.isBrowser) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('added') === 'true') {
        console.log("Dogadjaj je uspješno dodan.");
        const email = urlParams.get('email');
        const cijena = urlParams.get('cijena');

        if (email && cijena) {
          const emailObj = new Email(email, `Zahtjev za rezervaciju dogadjaja je uspjesno prosljedjen. Cijena usluge je: ${cijena} KM`);
    
          this.emailService.sendEmail(emailObj).subscribe(response => {
          console.log('Email sent.');
          });
        }
        history.replaceState(null, '', window.location.pathname);
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dogadjaj je dodan u sistem!' });
        }, 200);
      }
      else if(urlParams.get('added') === 'false')
      {
        const message = urlParams.get('message') || '';
        history.replaceState(null, '', window.location.pathname);
        setTimeout(() => {
          this.messageService.add({ severity: 'error', summary: 'Greška', detail: message });
        }, 200);
      }
    }
    
      this.getDogadjajs();
      this.getDnevniRasporeds();
      this.getEkipas();
      this.getTerens();
      this.getDvoranas();
      this.getRasporeds();
      this.getUlazs();
      this.getTakmicenjes();
      this.getSports();
      this.getCjenovniks();
  }

  show()
  {
    this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dogadjaj je dodan u sistem!' });
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

  public getSports(): void 
  {
    this.sportService.getSports().subscribe(
      (response: Sport[]) => {
        this.sports = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCjenovniks(): void
  {
    this.cjenovnikService.getCjenovniks().subscribe(
      (response: Cjenovnik[]) => {
        this.cjenovniks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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
      const filteredTerens : Teren [] = [];
      for(let teren of this.terens)
      {
        if(teren.dostupan)
        {
          filteredTerens.push(teren);
        }
      }
      this.terens = filteredTerens;
    } catch (error) {
      console.error('Greška pri učitavanju terena:', error);
    }
  }

  public async loadSports(): Promise<void> {
    try{
      this.sports = await this.sportService.getSports().toPromise() || [];
      const filteredSports: Sport[] = [];
      for(let sport of this.sports)
      {
        if(this.selectedTeren !== undefined)
        {
          if(sport.duzina <= this.selectedTeren?.duzina && sport.sirina <= this.selectedTeren.sirina 
            && sport.tipTerena.nazivTipaTerena == this.selectedTeren.tipTerena.nazivTipaTerena)
          {
            filteredSports.push(sport);
          }
        }
      }
      this.sports = filteredSports;
    } catch (error) {
      console.error('Greška pri učitavanju sportova:', error);
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
    await this.loadSports();
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
      if(dogadjaj.teren.idTeren == this.selectedTeren?.idTeren && dogadjaj.dnevniRaspored.idDnevniRaspored == this.selectedDnevniRaspored?.idDnevniRaspored && dogadjaj.odobren)
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
      console.log("Klijent: " , this.selectedKlijent?.korisnickoIme);
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


    return (
      godina == date2.getFullYear() &&
      mjesec == date2.getMonth() &&
      dan == date2.getDate()
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

  public izracunajCijenu(vrijemeOd: string, vrijemeDo: string): void
  {
    let vrijemeOdMillis: number = DogadjajComponent.timeToMillis(vrijemeOd);
    let vrijemeDoMillis: number = DogadjajComponent.timeToMillis(vrijemeDo);

    let diffMillis: number = vrijemeDoMillis - vrijemeOdMillis;
    let diffHours: number = 0.0;
    let cijenaTemp: number = 0.0

    let kraj: boolean = false;

    for(let c of this.cjenovniks)
    {
      if(c.teren.idTeren == this.selectedTeren?.idTeren)
      {
        if((vrijemeOd >= c.vrijemeOd && vrijemeOd <= c.vrijemeDo) && (vrijemeDo >= c.vrijemeOd && vrijemeDo <= c.vrijemeDo))
        {
          diffHours = diffMillis / 3600000.0;
          cijenaTemp = diffHours * c.cijena;
        }
        else if((vrijemeOd >= c.vrijemeOd && vrijemeOd <= c.vrijemeDo) && (vrijemeDo >= c.vrijemeDo))
        {
          let first: boolean = true;
          let rad: boolean = false;
          for(let temp of this.cjenovniks)
          {
            if(!kraj)
            {
              if(vrijemeOd >= temp.vrijemeOd && vrijemeOd < temp.vrijemeDo)
              {
                rad = true;
              }
              if(rad)
              {
                if(first)
                {
                  diffMillis = DogadjajComponent.timeToMillis(temp.vrijemeDo) - vrijemeOdMillis;
                  diffHours = diffMillis / 3600000.0;
                  cijenaTemp += diffHours * temp.cijena;
                  console.log("1.", cijenaTemp);
                  first = false;
                }
                else if(!first && vrijemeDo >= temp.vrijemeDo)
                {
                  diffMillis = DogadjajComponent.timeToMillis(temp.vrijemeDo) - DogadjajComponent.timeToMillis(temp.vrijemeOd);
                  diffHours = diffMillis / 3600000.0;
                  cijenaTemp += diffHours * temp.cijena;
                  console.log("2.", cijenaTemp);
                }
                else if(!first && vrijemeDo <= temp.vrijemeDo)
                {
                  diffMillis = vrijemeDoMillis - DogadjajComponent.timeToMillis(temp.vrijemeOd);
                  diffHours = diffMillis / 3600000.0;
                  cijenaTemp += diffHours * temp.cijena;
                  console.log("3.", cijenaTemp);
                  kraj = true;
                  break;
                }
              }
            }
          }
        }
      }
    }

    this.cijena = cijenaTemp;
    this.racunanjeVisible = false;
    this.izracunataCijena = true;
  }

  public static timeToMillis(time: string): number 
  {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
  }



  public onAddDogadjaj(addForm: NgForm): void
  {
    this.addVisible = false;
    if(this.selectedKlijent !== null)
    {
      addForm.form.get('odobren')?.setValue(false);
    }
    else
    {
      addForm.form.get('odobren')?.setValue(true);
      console.log('SSSSSSSSSSSSSSSSS');
    }
    console.log(this.isOdobren);
    console.log(this.selectedKlijent?.email);
    //this.klijentZaMail = this.selectedKlijent?.email || "";
    addForm.form.get('dnevniRaspored')?.setValue(this.selectedDnevniRaspored);
    this.dogadjajService.addDogadjaj(addForm.value).subscribe(
      (response: Dogadjaj) =>
      {
        //this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dogadjaj je dodan u sistem!' });
        this.getDogadjajs();
        console.log(this.klijentZaMail);
        /*if(this.klijentZaMail !== null)
        {
          console.log('BBBBB');
          const email = new Email(this.klijentZaMail, "Zahtjev za rezervaciju dogadjaja je uspjesno prosljedjen. Cijena usluge je: " + this.cijena + "KM");
          this.emailService.sendEmail(email).subscribe(response => {
            console.log('Email sent.');
            window.location.href = window.location.href.split('?')[0] + '?added=true';
          });
        }*/
          if(this.klijentZaMail !== null) {
            console.log('BBBBB');
            const email = new Email(this.klijentZaMail, "Zahtjev za rezervaciju dogadjaja je uspjesno prosljedjen. Cijena usluge je: " + this.cijena + "KM");
            
            // Dodavanje email-a i cijene kao URL parametara
            const newUrl = `${window.location.href.split('?')[0]}?added=true&email=${encodeURIComponent(this.klijentZaMail)}&cijena=${this.cijena}`;
            
            // Postavi novi URL i osveži stranicu
            window.location.href = newUrl;
          }
          
        else {
          window.location.href = window.location.href.split('?')[0] + '?added=true';
        }
      },
      (error: HttpErrorResponse) =>
      {
        const url = new URL(window.location.href);
        url.searchParams.set('added', 'false');
        url.searchParams.set('message', error.message);
        window.location.href = url.toString();

        //this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju dogadjaja' });
      }
    );
    addForm.reset();
  }


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

