import { Component } from '@angular/core';
import { Dvorana } from '../models/dvorana';
import { Teren } from '../models/teren';
import { Sport } from '../models/sport';
import { DvoranaService } from '../dvorana/dvorana.service';
import { TerenService } from '../teren/teren.service';
import { DogadjajService } from '../dogadjaj/dogadjaj.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dogadjaj } from '../models/dogadjaj';
import { DatePipe } from '@angular/common';
import { DogadjajDTO } from '../models/dogadjaj-dto';
import { CjenovnikService } from '../cjenovnik/cjenovnik.service';
import { Cjenovnik } from '../models/cjenovnik';
import { endianness } from 'node:os';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;
  terens: Teren[] = [];
  selectedTeren: Teren | undefined;
  priceLists: Cjenovnik[] | undefined;
  weeklyEvents: DogadjajDTO[] = [];
  eventMatrix: (DogadjajDTO | null)[][] = [];

  datePipe: DatePipe;
  selectedDatum: Date = new Date();
  headerDates: string[] = [];
  times: string[] = [];
  earliestDate = new Date(-8640000000000000);
  defaultDate: Date = new Date("January 31 1980 12:30");

  isPretraziDisabled = true;
  showCalendar = false;

  constructor(private dvoranaService: DvoranaService, private terenService: TerenService, 
              private dogadjajService: DogadjajService, private cjenovnikService: CjenovnikService) {
    this.datePipe = new DatePipe('en-US');
  }

  ngOnInit(): void 
  {
        this.getDvoranas();
        this.selectedDatum = new Date();
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
    this.terens = [];
    this.terenService.getTerensByDostupanAndDvorana(this.selectedDvorana?.idDvorana || 1).subscribe(
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

  public getDogadjajs(nextSevenDaysSQL: (string | null)[]): void
  {
    this.weeklyEvents = [];
    this.dogadjajService.getWeeklyEvents(this.selectedTeren?.idTeren, nextSevenDaysSQL).subscribe({
      next: response => {
        this.weeklyEvents = response;
        console.log(this.weeklyEvents)
        this.getCjenovnikForTeren(this.selectedTeren?.idTeren);
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  private getCjenovnikForTeren(idTeren: number | undefined){
    this.priceLists = [];
    if (idTeren)
       this.cjenovnikService.getCjenovnikByTerenId(idTeren).subscribe({
        next: response => {
          this.priceLists = response;
          console.log(this.priceLists);
          this.setTimeIntervals();
          this.setRowSpan(this.weeklyEvents);
          this.prepareEventMatrix();
          this.showCalendar = true;
        },
        error: error => {
          alert(error.message);
        }
      });
  }

  public async onDvoranaChange(event: any) {
    this.getTerens();

    if (this.selectedDvorana != undefined && this.selectedTeren != undefined){
      this.isPretraziDisabled = false;
      this.showCalendar = false;
    }
    else{
        this.isPretraziDisabled = true;
        this.selectedTeren = undefined;
        this.showCalendar = false;
    }
  }

  public async onTerenChange(event: any) {
    if (this.selectedDvorana != undefined && this.selectedTeren != undefined){
      this.isPretraziDisabled = false;
      this.showCalendar = false;
    }
    else{
      this.isPretraziDisabled = true;
      this.showCalendar = false;
    }
  }

  public onDateSelect(event: any): void {
    if (typeof event === 'string') {
      this.selectedDatum = new Date(event);
      this.isPretraziDisabled = false;
      this.showCalendar = false;
    } else if (event instanceof Date) {
      this.selectedDatum = event;
      this.isPretraziDisabled = false;
      this.showCalendar = false;
    }
  }

  public pretrazi(): void
  {
    let jsonDatum = this.formatDate(this.selectedDatum);
    this.headerDates = [];
    let nextSevenDaysSQL = [];
    this.headerDates.push(jsonDatum);
    nextSevenDaysSQL.push(this.datePipe.transform(this.selectedDatum, 'yyyy-MM-dd'));

    for (let i = 1; i < 7; i++) {
      const futureDate = new Date(this.selectedDatum);
      futureDate.setDate(this.selectedDatum.getDate() + i);
      this.headerDates.push(this.formatDate(futureDate));
      nextSevenDaysSQL.push(this.datePipe.transform(futureDate, 'yyyy-MM-dd'));
    }

    this.getDogadjajs(nextSevenDaysSQL);
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

  setTimeIntervals() {
    this.times = [];
    let currentTime, targetTime;
    const stepMinutes = 30;

    if (this.priceLists){
      const startHour = this.priceLists[0].vrijemeOd;
      const endHour = this.priceLists[this.priceLists.length - 1].vrijemeDo;

      currentTime = this.convertStringToDate(startHour);
      targetTime = this.convertStringToDate(endHour);
      while (currentTime < targetTime) {
        const temp = this.convertDateToString(currentTime);
        // Increment by the specified number of minutes
        currentTime.setMinutes(currentTime.getMinutes() + stepMinutes);
        this.times.push(temp + ' - ' + this.convertDateToString(currentTime));
      }
    }
  }

  private convertStringToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); 
    return date;
  }

  private convertDateToString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  setRowSpan(dogadjaji: DogadjajDTO[]) {
    let count = 0;
  
    for (let i = 0; i < dogadjaji.length; i++) {
      this.times.forEach(time => {
        if (this.isEventInTimeRange(dogadjaji[i], time))
          count++;
      })
      dogadjaji[i].rowspan = count;
      count = 0;
    }
  }

  prepareEventMatrix() {
    this.eventMatrix = [];
    for (let i = 0; i < this.times.length; i++) {
      const row = [];
      
      for (let j = 0; j < this.headerDates.length; j++) {
        const event = this.findEventForDateAndHour(this.headerDates[j], this.times[i]);
        if (event){
          if (!event.display){
            event.display = true;
            row.push(event);
          }
          else
            row.push(new DogadjajDTO(event.infoDogadjaja, event.datum, event.vrijemeOd, event.vrijemeDo, true, event.vrstaTakmicenja, null, null, null))
        }
        else
          row.push(null);
      }
      
      this.eventMatrix.push(row);  // Add row to matrix
    }
    console.log(this.eventMatrix)
  }
  
  findEventForDateAndHour(date: string, hour: string): DogadjajDTO | null {
    // Find the event that matches the date and hour
    return this.weeklyEvents.find(event => event.datum === date && this.isEventInTimeRange(event, hour)) || null;
  }

  isEventInTimeRange(event: DogadjajDTO, hour: string): boolean {
    const startInterval = this.convertStringToDate(hour.split('-')[0].trim());
    const endInterval = this.convertStringToDate(hour.split('-')[1].trim());
    const eventStartHour = this.convertStringToDate(event.vrijemeOd.match(/^\d{2}:\d{2}/)?.[0].trim() || "");
    const eventEndHour = this.convertStringToDate(event.vrijemeDo.match(/^\d{2}:\d{2}/)?.[0].trim() || "");

    return startInterval >= eventStartHour && endInterval <= eventEndHour;
  }

  getMatrixElement(row: number, col: number) : DogadjajDTO | null {
    return this.eventMatrix[row][col];
  }  

  showEventInfo(event: DogadjajDTO): string {
    if (event.vrstaTakmicenja === 'Rekreativni termin')
      return event.vrstaTakmicenja;
    else if (event.domacaEkipa != null && event.gostujucaEkipa != null)
      return event.nazivSporta + '\n' + event.domacaEkipa + ' - ' + event.gostujucaEkipa;
    else
      return 'null';
  }

}
