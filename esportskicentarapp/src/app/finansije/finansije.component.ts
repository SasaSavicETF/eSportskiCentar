import { Component, OnInit } from '@angular/core';
import { FinansijeService } from './finansije.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ZaradaStatsDto } from '../models/zarada-stats-dto';
import { StatsDto } from '../models/stats-dto';

@Component({
  selector: 'app-finansije',
  templateUrl: './finansije.component.html',
  styleUrl: './finansije.component.css',
  providers: [MessageService]
})
export class FinansijeComponent implements OnInit {
  public zaradaStats: ZaradaStatsDto[] = [];
  public sportStats: Map<string, number> = new Map();
  public dvoranaStats: Map<string, number> = new Map();
  public specificSportStats: StatsDto[] = [];
  public specificDvoranaStats: StatsDto[] = [];
  public numberOfKlijents: number | undefined;
  public numberOfDogadjajs: number | undefined;
  public numberOfDvoranas: number | undefined;
  public numberOfRezervacija: number | undefined;
  public isBackSportVisible: boolean = false;
  public isDrillDownSport: boolean = false;
  public isBackDvoranaVisible: boolean = false;
  public isDrillDownDvorana: boolean = false;

  eventData: any;
  sportData: any;
  dvoranaData: any;
  sportOptions: any;
  dvoranaOptions: any;
  eventChartOptions: any;
  selectedDate: string = "this_month";
  loadingSport: boolean = false;
  loadingDvorana: boolean = false;

  year: number;
  month: number;
  daysMap = new Map<number, number>();

  labels: string[] = [];

  dateOptions = [
    { label: 'Posljednjih sedam dana', value: 'last_seven_days' },
    { label: 'Ovaj mjesec', value: 'this_month' },
    { label: 'Ova godina', value: 'this_year' },
    { label: 'Sve', value: 'all' }
  ];

  constructor(private finansijeService: FinansijeService, private messageService: MessageService) {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
  }

  ngOnInit() {
    this.loadData();

    this.sportData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#42A5F5", "#66BB6A", "#FFA726", "#42A545", "#11BB6A",
            "#FFAFF6", "#F57C00", "#7E57C2"
          ],
          hoverBackgroundColor: [
            "#64B5F6", "#81C784", "#FFB74D", "#64B522", "#81D784",
            "#FAA74D", "#FF8A65", "#B39DDB"
          ],
          barThickness: 20
        }
      ]
    };

    this.eventChartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          }
        }
      }
    };

    this.sportOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };

    this.dvoranaOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }

  loadData() {
    this.loadProfitData();
    this.loadSportData();
    this.loadDvoranaData();
  }

  loadSportData() {
    this.finansijeService.getSportData(this.selectedDate).subscribe(
      (response: { [sport: string]: number }) => {
        this.sportStats = new Map(Object.entries(response));
        this.updateStats("SPORT", this.sportStats);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadSpecificSportData(sportName: string) {
    this.finansijeService.getSpecificSportData(this.selectedDate, sportName).subscribe(
      (response: StatsDto[]) => {
        this.specificSportStats = response;
        this.loadDrillDownData("SPORT", sportName, this.specificSportStats);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  loadProfitData() {
    this.finansijeService.getZaradaData(this.selectedDate).subscribe(
      (response: ZaradaStatsDto[]) => {
        this.zaradaStats = response;
        this.updateZaradaStats();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadDvoranaData() {
    this.finansijeService.getDvoranaData(this.selectedDate).subscribe(
      (response: { [dvorana: string]: number }) => {
        this.dvoranaStats = new Map(Object.entries(response));
        this.updateStats("DVORANA", this.dvoranaStats);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadSpecificDvoranaData(dvoranaName: string) {
    this.finansijeService.getSpecificDvoranaData(this.selectedDate, dvoranaName).subscribe(
      (response: StatsDto[]) => {
        this.specificDvoranaStats = response;
        this.loadDrillDownData("DVORANA", dvoranaName, this.specificDvoranaStats);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  updateZaradaStats() {
    let sportData: number[] = [];
    let rezervacijeData: number[] = [];

    if (this.selectedDate === 'last_seven_days') {
      this.labels = this.getLastSevenDays(this.daysMap);
    }

    else if (this.selectedDate === 'this_month') {
      this.labels = this.getDayLabels(this.year, this.month);

    } else if (this.selectedDate === 'this_year') {
      this.labels = this.getMonthLabels();

    } else if (this.selectedDate === 'all') {
      const dates = this.zaradaStats.map(entry => this.getDate(entry.datum));
      const oldest = Math.min(...dates.map(date => date.getFullYear()));

      this.labels = this.getYearLabels(oldest);
    }

    const rezervacije = new Array(this.labels.length).fill(0);
    const sport = new Array(this.labels.length).fill(0);
    this.zaradaStats.forEach(entry => {
      const entryDate = this.getDate(entry.datum);
      let dateValue;
      switch (this.selectedDate) {
        case 'last_seven_days':
          dateValue = this.daysMap.get(entryDate.getDate());
          break;
        case 'this_month':
          dateValue = entryDate.getDate()
          break;
        case 'this_year':
          dateValue = entryDate.getMonth();
          break;
        case 'all':
          dateValue = this.labels.indexOf(entryDate.getFullYear().toString());
          break;
      }
      if (dateValue !== undefined) {
        rezervacije[dateValue] = entry.zaradaOdRezervacija;
        sport[dateValue] = entry.zaradaOdSporta;
      }
    });

    sportData = sport;
    rezervacijeData = rezervacije;

    this.eventData = {
      labels: this.labels,
      datasets: [
        {
          label: "Zarada od sporta",
          data: sportData,
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: .4
        },
        {
          label: "Zarada od rezervacija",
          data: rezervacijeData,
          fill: false,
          borderColor: '#FFA500',
          backgroundColor: '#FFA500',
          tension: .4
        }
      ]
    };
  }

  updateStats(chartToUpdate: string, mapData: Map<string, number>) {
    let labels: string[] = [];
    let dataPoints: number[] = [];
    let chartData: any;

    mapData.forEach((value, key) => {
      labels.push(key);
      dataPoints.push(value);
    });


    chartData = {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          backgroundColor: [
            "#42A5F5", "#66BB6A", "#FFA726", "#42A545", "#11BB6A",
            "#FFAFF6", "#F57C00", "#7E57C2"
          ],
          hoverBackgroundColor: [
            "#64B5F6", "#81C784", "#FFB74D", "#64B522", "#81D784",
            "#FAA74D", "#FF8A65", "#B39DDB"
          ],
          barThickness: 20
        }
      ]
    };

    switch (chartToUpdate) {
      case "SPORT":
        this.sportData = chartData;
        break;
      case "DVORANA":
        this.dvoranaData = chartData;
        break;
    }

  }

  onSportClick(event: any) {
    if (!this.isDrillDownSport && event.dataset && event.element) {
      const clickedIndex = event.element.index;
      if (clickedIndex !== undefined) {
        this.loadingSport = true;
        const sport = this.sportData.labels[clickedIndex];
        this.loadSpecificSportData(sport);
        this.isDrillDownSport = true;
        this.isBackSportVisible = true;
      }
    }
  }

  onDvoranaClick(event: any) {
    if (!this.isDrillDownDvorana && event.dataset && event.element) {
      const clickedIndex = event.element.index;
      if (clickedIndex !== undefined) {
        this.loadingDvorana = true;
        const dvorana = this.dvoranaData.labels[clickedIndex];
        this.loadSpecificDvoranaData(dvorana);
        this.isDrillDownDvorana = true;
        this.isBackDvoranaVisible = true;
      }
    }
  }

  loadDrillDownData(chartToUpdate: string, name: string, stats: StatsDto[]) {
    const zaradaData = new Array(this.labels.length).fill(0);
    let chartData: any;
    stats.forEach(entry => {
      const entryDate = this.getDate(entry.datum);
      let dateValue;
      switch (this.selectedDate) {
        case 'last_seven_days':
          dateValue = this.daysMap.get(entryDate.getDate());
          break;
        case 'this_month':
          dateValue = entryDate.getDate()
          break;
        case 'this_year':
          dateValue = entryDate.getMonth();
          break;
        case 'all':
          dateValue = this.labels.indexOf(entryDate.getFullYear().toString());
          break;
      }
      if (dateValue !== undefined) {
        zaradaData[dateValue] = entry.zaradaOdSporta;
      }
    });


    chartData = {
      labels: this.labels,
      datasets: [
        {
          label: `${name}`,
          data: zaradaData,
          backgroundColor: '#FF6384'
        }
      ]
    };


    switch (chartToUpdate) {
      case "SPORT":
        this.sportData = chartData;
        this.sportOptions = {
          indexAxis: 'x'
        }
        this.loadingSport = false;
        break;
      case "DVORANA":
        this.dvoranaData = chartData;
        this.dvoranaOptions = {
          indexAxis: 'x'
        }
        this.loadingDvorana = false;
        break;
    }
  }

  goBackSport(): void {
    this.isBackSportVisible = false;
    this.isDrillDownSport = false;
    this.updateStats("SPORT", this.sportStats);
    this.sportOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }

  goBackDvorana(): void {
    this.isBackDvoranaVisible = false;
    this.isDrillDownDvorana = false;
    this.updateStats("DVORANA", this.dvoranaStats);
    this.dvoranaOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }

  getYearLabels(startingYear: number): string[] {
    const years: number[] = [];
    const currYear = new Date().getFullYear();

    if (currYear === startingYear)
      startingYear = startingYear - 5;
    for (let year = startingYear; year <= currYear; year++) {
      years.push(year);
    }
    return years.map(year => `${year}`);
  }

  getMonthLabels(): string[] {
    return [
      'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
    ];
  }

  getDayLabels(year: number, month: number): string[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  }

  getLastSevenDays(daysMap: Map<number, number>): string[] {
    const today = new Date();
    const lastSevenDays: string[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      daysMap.set(date.getDate(), 6 - i);
      lastSevenDays.push(date.getDate().toString());
    }

    return lastSevenDays.reverse();
  }

  getDate(d: string) {

    const parts = d.split('.');

    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    return new Date(year, month - 1, day);
  }
}
