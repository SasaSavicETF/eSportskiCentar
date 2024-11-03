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
import { Takmicenje } from '../models/takmicenje';
import { TakmicenjeService } from '../takmicenje/takmicenje.service';
import { Sport } from '../models/sport';
import { SportService } from '../sport/sport.service';
import { Cjenovnik } from '../models/cjenovnik';
import { CjenovnikService } from '../cjenovnik/cjenovnik.service';
import { Klijent } from '../models/klijent';
import { KlijentService } from '../services/klijent.service';
import { UserDTO } from '../models/user-dto';
import { EmailService } from '../services/email.service';
import { Email } from '../models/email';
import { Svlacionica } from '../models/svlacionica';
import { SvlacionicaService } from '../svlacionica/svlacionica.service';


@Component({
  selector: 'app-dogadjaj',
  templateUrl: './dogadjaj.component.html',
  styleUrl: './dogadjaj.component.css',
  providers: [MessageService, CheckboxModule, TimelineModule, CardModule, ButtonModule]
})
export class DogadjajComponent implements OnInit{
  infoDogadjaja!: string | null;
  activeUser!: UserDTO | null;
  selectedKlijent!: Klijent | null;
  isPretraziDisabled = true;
  isOdobren: boolean = true;
  showDogadjajs = false;
  icon: string = "pi pi-ticket";
  tempVrijemeDo: string = "";
  tempVrijemeOd: string = "";

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;
  terens: Teren[] = [];
  dostupniTerens : Teren [] = [];
  filteredTerens : Teren [] = [];
  selectedTeren: Teren | undefined;
  sports: Sport[] = [];
  filteredSports: Sport[] = [];
  selectedSport: Sport | undefined;

  danasnjiDatum: Date = new Date();
  selectedDatum: Date = new Date();
  earliestDate = new Date(-8640000000000000);
  defaultDate: Date = new Date("January 31 1980 12:30");

  dnevniRasporeds: DnevniRaspored[] = [];
  dnevniRasporedsAsc: DnevniRaspored[] = [];
  selectedDnevniRaspored: DnevniRaspored | undefined;
  selectedRaspored: Raspored | undefined;
  rasporeds: Raspored[] = [];
  public dogadjajs: Dogadjaj[] = [];
  public sortedDogadjajs: Dogadjaj[] = [];
  ulazs: Ulaz[] = [];
  svlacionicas: Svlacionica[] = [];

  cjn: number = 2;
  racunanjeVisible: boolean = true;
  izracunataCijena: boolean = false;
  cijena: number = 15;
  addVisible: boolean = false;
  deleteVisible: boolean = false;


  public delDogadjaj: Dogadjaj | undefined;
  public delIdDogadjaj: number = -1;

  takmicenjes: Takmicenje[] = [];
  selectedTakmicenje: Takmicenje | undefined;
  ekipas: Ekipa[] = [];
  selectedDomacaEkipa: Ekipa | undefined;
  selectedGostujucaEkipa: Ekipa | undefined;
  cjenovniks: Cjenovnik[] = [];

  vremenskiSukob: boolean | undefined; 

  constructor(private userService: KlijentService, private ekipaService: EkipaService, private dvoranaService: DvoranaService, 
    private terenService: TerenService, private takmicenjeService: TakmicenjeService, private sportService: SportService,
    private cjenovnikService: CjenovnikService, private dnevniRasporedService: DnevniRasporedService,
    private dogadjajService: DogadjajService, private rasporedService: RasporedService, private ulazService: UlazService,
    private svlacionicaService: SvlacionicaService, private messageService: MessageService, private emailService: EmailService) { 
        this.activeUser = userService.activeUser;
        if(this.activeUser?.role == 'user'){
            this.selectedKlijent = new Klijent(this.activeUser.ime, this.activeUser.prezime, this.activeUser.korisnickoIme, this.activeUser.lozinka,
              this.activeUser.brojTelefona, this.activeUser.email, "klijent");
            this.selectedKlijent.idKlijent = this.activeUser.id;
        }
  }


  ngOnInit(): void 
  {
        this.getDvoranas();
        //this.getTerens();
        this.getDnevniRasporeds();
        this.getRasporeds();
        //this.getDogadjajs();
        this.getUlazs();
        this.getSvlacionicas();
        //this.getSports();
        this.getEkipas();
        this.getTakmicenjes();
        this.getCjenovniks();
  }

  show()
  {
    this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Dogadjaj je dodan u sistem!' });
  }

  public getDvoranas(): void
  {
    this.dvoranaService.getDvoranas().subscribe(
      (response: Dvorana[]) =>
      {
        if(this.activeUser?.role !== 'upravnik')
        {
          this.dvoranas = response;
        }
        else{
          const filteredDvoranas: Dvorana[] = [];
          for(let dvorana of response)
          {
            if(dvorana.idDvorana == this.activeUser.dvorana?.idDvorana)
            {
              filteredDvoranas.push(dvorana);
              //break;
            }
          }
          this.dvoranas = filteredDvoranas;
        }
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public getTerens(): void
  {
    this.terens = [];
    this.terenService.getTerens().subscribe(
      (response: Teren[]) =>
      {
        if(this.activeUser?.role !== 'upravnik')
        {
          this.terens = response;
        }
        else
        {
          const filteredTerens: Teren[] = [];
          for(let teren of response)
          {
            if(teren.dvorana.idDvorana == this.activeUser.dvorana?.idDvorana)
            {
              filteredTerens.push(teren);
            }
          }
          this.terens = filteredTerens;
        }

        this.filterTerens();        
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public filterTerens(): void {
    this.dostupniTerens = [];
    for(let teren of this.terens){
        if(teren.dostupan)
            this.dostupniTerens.push(teren);
    }

    this.filteredTerens = [];
    for(const teren of this.dostupniTerens){
      console.log(teren.dvorana.idDvorana + " - " + this.selectedDvorana?.idDvorana);
      if(teren.dvorana.idDvorana == this.selectedDvorana?.idDvorana)
      this.filteredTerens.push(teren);
    }
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

  public getDogadjajs(): void
  {
    this.dogadjajs = [];
    this.dogadjajService.getDogadjajs().subscribe(
      (response: Dogadjaj[]) => 
      {
        this.dogadjajs = response;
        this.filterDogadjajs();
        this.sortDogadjajs();
        this.showDogadjajs = true;
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
    this.sports = [];
    this.sportService.getSports().subscribe(
      (response: Sport[]) => {
        this.sports = response;
        this.filterSports();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public filterSports(){
    this.filteredSports = [];
    for(let sport of this.sports)
      if(this.selectedTeren !== undefined){
          if(sport.duzina <= this.selectedTeren?.duzina && sport.sirina <= this.selectedTeren.sirina 
            && sport.tipTerena.nazivTipaTerena == this.selectedTeren.tipTerena.nazivTipaTerena)
          {
                this.filteredSports.push(sport);
          }
      }
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

  public getSvlacionicas(): void
  {
    this.svlacionicaService.getSvlacionicas().subscribe(
      (response: Svlacionica[]) => {
        this.svlacionicas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public async onDvoranaChange(event: any) {
    console.log(this.selectedDvorana?.nazivDvorane);
    this.getTerens();

    if (this.selectedDvorana != undefined && this.selectedTeren != undefined){
      this.isPretraziDisabled = false;
      this.showDogadjajs = false;
    }
    else{
        this.isPretraziDisabled = true;
        this.selectedTeren = undefined;
        this.showDogadjajs = false;
    }
  }

  public async onTerenChange(event: any) {
    console.log(this.selectedTeren?.nazivTerena);
    this.getSports();
  
    if (this.selectedDvorana != undefined && this.selectedTeren != undefined){
      this.isPretraziDisabled = false;
      this.showDogadjajs = false;
    }
    else{
      this.isPretraziDisabled = true;
      this.showDogadjajs = false;
    }
  }

  public onDateSelect(event: any): void {
    if (typeof event === 'string') {
      this.selectedDatum = new Date(event);
      this.isPretraziDisabled = false;
      this.showDogadjajs = false;
    } else if (event instanceof Date) {
      this.selectedDatum = event;
      this.isPretraziDisabled = false;
      this.showDogadjajs = false;
    }
  }

  public filtriraj(): void
  {
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
      this.filterUlazs();
      this.filterSvlacionicas();
      this.getDogadjajs();
  }

  public filterDogadjajs(): void
  {
    let filterDogadjajs: Dogadjaj[] = [];
    for(const dogadjaj of this.dogadjajs)
    {
      console.log(this.selectedTeren?.idTeren);
      if(dogadjaj.teren.idTeren == this.selectedTeren?.idTeren && dogadjaj.dnevniRaspored.idDnevniRaspored == this.selectedDnevniRaspored?.idDnevniRaspored && dogadjaj.odobren)
        filterDogadjajs.push(dogadjaj);
    }
    this.dogadjajs = filterDogadjajs;
  }

  public sortDogadjajs(): void {
    this.sortedDogadjajs = [];
    this.sortedDogadjajs = this.dogadjajs.sort((a, b) => {
        const timeA = a.vrijemeOd.split(':').map(Number);
        const timeB = b.vrijemeOd.split(':').map(Number);
        
        const dateA = new Date(0, 0, 0, timeA[0], timeA[1], timeA[2]);
        const dateB = new Date(0, 0, 0, timeB[0], timeB[1], timeB[2]);

        return dateA.getTime() - dateB.getTime();
    });
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

  public filterSvlacionicas(): void
  {
    let filterSvlacionicas: Svlacionica[] = [];
    for(const svlacionica of this.svlacionicas)
    {
      if(svlacionica.dvorana.idDvorana == this.selectedTeren?.dvorana.idDvorana && svlacionica.dostupna)
      {
        filterSvlacionicas.push(svlacionica);
      }
    }
    this.svlacionicas = filterSvlacionicas;
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  resetAddDialog(){
    this.selectedTakmicenje = undefined;
    this.selectedSport = undefined;
    this.tempVrijemeOd = "";
    this.tempVrijemeDo = "";
    this.selectedDomacaEkipa = undefined;
    this.selectedGostujucaEkipa = undefined;
    this.infoDogadjaja = null;
    this.izracunataCijena = false;
    this.racunanjeVisible = true;
  }

  public onAddDogadjaj(addForm: NgForm): void
  {
    this.addVisible = false;
    if (this.activeUser?.role == 'user')
      addForm.form.get('odobren')?.setValue(false);
    addForm.form.get('dnevniRaspored')?.setValue(this.selectedDnevniRaspored);

    this.dogadjajService.addDogadjaj(addForm.value).subscribe(
      (response: Dogadjaj) =>
      {
        this.getDogadjajs();
        if (this.activeUser?.role === 'user' && this.activeUser.email){
          const emailObj = new Email(this.activeUser.email, `Zahtjev za rezervaciju događaja je uspješno proslijeđen. Cijena usluge je: ${this.cijena} KM`);
          this.emailService.sendEmail(emailObj).subscribe(response => {
            console.log('Email sent.');
          });
        }
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Događaj je dodan u sistem!' });
        }, 200);
      },
      (error: HttpErrorResponse) =>
      {
        alert('Greška u dodavanju događaja');
      }
    );
    this.resetAddDialog();
    //addForm.reset();
  }

  public async onRasporedSelected()
  {
    await this.loadDnevniRasporeds();
  }

  public async loadDnevniRasporeds(): Promise<void> {
    try {
      this.dnevniRasporedsAsc = await this.dnevniRasporedService.getDnevniRasporeds().toPromise() || [];
    } catch (error) {
      console.error('Greška pri učitavanju terena:', error);
    }
  }

  public async checkVremenskiSukob(addForm: NgForm): Promise<void> {
    try{
      this.vremenskiSukob = await this.dogadjajService.vremenskiSukob(addForm.value).toPromise();
      console.log(this.vremenskiSukob);
    } catch (error)
    {
      console.error('Greška pri provjeri vremena:', error);
    }
  }

  public izracunajCijenu(vrijemeOd: string, vrijemeDo: string, addForm: NgForm): void
  {
    /*
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
    this.izracunataCijena = true;
    this.racunanjeVisible = !this.izracunataCijena;
    */
    this.checkVremenskiSukob(addForm);
    let totalSum = 0;
    let clientStartTime: number =this.convertToMillis(vrijemeOd);
    let clientEndTime: number = this.convertToMillis(vrijemeDo);

    this.cjenovniks.forEach(cjenovnik => {
      if (cjenovnik.teren.idTeren == this.selectedTeren?.idTeren){
        const terminStartTime = this.convertToMillis(cjenovnik.vrijemeOd);
        const terminEndTime = this.convertToMillis(cjenovnik.vrijemeDo);

        // Check if there's an overlap between client time and price slot
        const overlapStart = clientStartTime > terminStartTime ? clientStartTime : terminStartTime; // latest start time
        const overlapEnd = clientEndTime < terminEndTime ? clientEndTime : terminEndTime; // earliest end time
            // Calculate the overlap duration in hours
        if (overlapStart < overlapEnd) { // There is an overlap
            const overlapDurationHours = (overlapEnd - overlapStart) / (1000 * 60 * 60);
                // Add the cost for this overlapping duration to the total sum
            totalSum += overlapDurationHours * cjenovnik.cijena;
        }
      }
    })

    this.cijena = Math.round(totalSum);
    this.izracunataCijena = true;
    this.racunanjeVisible = !this.izracunataCijena;
  }

  convertToMillis(timeString: string){
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    const milliseconds = date.getTime();

    return milliseconds;
  }

  public static timeToMillis(timeString: string): number 
  {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
  }

  public onDeleteDogadjaj(dogadjaj: Dogadjaj): void
  {
    this.deleteVisible = false;
    this.dogadjajService.deleteDogadjaj(dogadjaj.idDogadjaj).subscribe(
      (response: void) => {
        //this.getDogadjajs();
        this.dogadjajs = this.dogadjajs.filter(item => item.idDogadjaj !== dogadjaj.idDogadjaj);        
        this.sortedDogadjajs = this.sortedDogadjajs.filter(item => item.idDogadjaj !== dogadjaj.idDogadjaj);    
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Događaj je obrisan sa sistema!' });
        }, 200);

        if(dogadjaj.klijent !== null && dogadjaj.klijent.email != null){
          const email = new Email(dogadjaj.klijent.email, "Vaš događaj zakazan za " + dogadjaj.teren.nazivTerena + " je otkazan od strane službenog lica.");
          this.emailService.sendEmail(email).subscribe(response => {
            console.log('Email sent.');
          });
        }
      },
      (error: HttpErrorResponse) => {
        alert('greška u brisanju događaja')
      }
    );
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

  public searchDogadjajs(key: string): void
  {
    const results: Dogadjaj[] = [];
    for(const dogadjaj of this.dogadjajs)
    {
      if((dogadjaj.domacaEkipa != undefined && dogadjaj.domacaEkipa.nazivEkipe.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (dogadjaj.gostujucaEkipa != undefined && dogadjaj.gostujucaEkipa.nazivEkipe.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (dogadjaj.teren != undefined && dogadjaj.teren.nazivTerena.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
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

}

