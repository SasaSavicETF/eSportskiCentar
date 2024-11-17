import { Component, OnInit } from '@angular/core';
import { Dogadjaj } from '../models/dogadjaj';
import { UpravnikPanelService } from './upravnik-panel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { KlijentService } from '../services/klijent.service';
import { MessageService } from 'primeng/api';
import { DogadjajStatsDto } from '../models/dogadjaj-stats-dto';

@Component({
  selector: 'app-upravnik-panel',
  templateUrl: './upravnik-panel.component.html',
  styleUrl: './upravnik-panel.component.css',
  providers: [MessageService]
})
export class UpravnikPanelComponent implements OnInit {

  public dogadjajs: DogadjajStatsDto[] = [];
  public reservationStats: Map<string, number> = new Map();
  public hallName: string = "";

  eventData: any;
  sportData: any;
  userdata: any;
  options: any;
  eventChartOptions: any;
  selectedDate: string = "this_month";

  year: number;
  month: number;

  dateOptions = [
    { label: 'Posljednjih sedam dana', value: 'last_seven_days' },
    { label: 'Ovaj mjesec', value: 'this_month' },
    { label: 'Ova godina', value: 'this_year' },
    { label: 'Sve', value: 'all' }
  ];

  constructor(private upravnikService: UpravnikPanelService, private klijentService: KlijentService,
     private messageService: MessageService) {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
  }

  ngOnInit(): void {
    this.getHallName()
    this.loadEventData();

    this.eventChartOptions = {
      responsive: false,
      maintainAspectRatio: false, // Keep this true to maintain aspect ratio
      plugins: {
        legend: {
          display: false // Adjust as needed
        }
      },
      scales: {
        y: {
          beginAtZero: true, // ensures the Y-axis starts at zero
          ticks: {
            stepSize: 10, // defines the step between each tick mark
          }
        }
      }
    };

    this.options = {
      responsive: false,
      maintainAspectRatio: false, // Keep this true to maintain aspect ratio
      plugins: {
        legend: {
          position: 'right' // Adjust as needed
        }
      }
    };
  }

  getHallName() {
    this.upravnikService.getHallName(this.klijentService.activeUser!.id).subscribe(
      (response: string) => {
        this.hallName = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadEventData() {
    this.upravnikService.getDogadjajsStatistic(this.selectedDate, this.klijentService.activeUser!.id).subscribe(
      (response: DogadjajStatsDto[]) => {
        this.dogadjajs = response;
        this.updateEventStats();
        this.updateSportStats();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateEventStats() {
    let labels: string[] = [];
    let dataPoints: number[] = [];

    if (this.selectedDate === 'last_seven_days') {
      let daysMap = new Map<number, number>();
      labels = this.getLastSevenDays(daysMap);
      const days = new Array(labels.length).fill(0);

      this.dogadjajs.forEach(entry => {
        const entryDate = this.getDate(entry.datum);
        const day = daysMap.get(entryDate.getDate())
        if (day !== undefined)
          days[day]++;
      });

      dataPoints = days;

    }

    if (this.selectedDate === 'this_month') {
      labels = this.getDayLabels(this.year, this.month);
      const days = new Array(labels.length).fill(0);


      this.dogadjajs.forEach(entry => {
        const entryDate = this.getDate(entry.datum);
        const day = entryDate.getDate() - 1;
        days[day]++;
      });

      dataPoints = days;

    } else if (this.selectedDate === 'this_year') {
      labels = this.getMonthLabels();
      const months = new Array(labels.length).fill(0);

      this.dogadjajs.forEach(entry => {
        const entryDate = this.getDate(entry.datum);
        const month = entryDate.getMonth();
        months[month]++;
      });

      dataPoints = months;
    } else if (this.selectedDate === 'all') {
      const dates = this.dogadjajs.map(entry => this.getDate(entry.datum));
      const oldest = Math.min(...dates.map(date => date.getFullYear()));

      labels = this.getYearLabels(oldest);
      const years = new Array(labels.length).fill(0);

      this.dogadjajs.forEach(entry => {
        const entryDate = this.getDate(entry.datum);
        const year = entryDate.getFullYear();

        const yearIndex = labels.indexOf(year.toString());
        years[yearIndex]++;

      });

      dataPoints = years;
    }

    this.eventData = {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }

  updateSportStats() {
    const topSports = this.getTopSports();
    let labels: string[] = [];
    let dataPoints: number[] = [];

    topSports.forEach(([sport, count]) => {
      labels.push(sport);
      dataPoints.push(count);
    })

    this.sportData = {
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
          ]
        }
      ]
    };
  }

  getTopSports() {
    const sportCount = new Map<string, number>();

    this.dogadjajs.forEach(dogadjaj => {
      if (dogadjaj.sport !== null && dogadjaj.sport !== null) {
        const sport = dogadjaj.sport;
        if (sportCount.has(sport))
          sportCount.set(sport, sportCount.get(sport)! + 1);
        else
          sportCount.set(sport, 1);
      }
    });

    const sortedSports = Array.from(sportCount.entries()).sort((a, b) => b[1] - a[1]);

    const topSports = sortedSports.slice(0, 7);
    const otherSports = sortedSports.slice(7);

    if (otherSports.length > 0) {
      const otherCount = otherSports.reduce((acc, sport) => acc + sport[1], 0);
      topSports.push(["Ostali", otherCount]);
    }

    return topSports;
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

    return lastSevenDays.reverse(); // To show the days in ascending order
  }

  getDate(d: string) {
    console.log(d);
    const parts = d.split('.');

    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    if (month === 2) {
      if (day === 28) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          day = 29;
        } else {
          day = 1;
          month = 3;
        }
      } else if (day === 29) {
        day = 1;
        month = 3;
      }
    }

    if (day === 30 && (month === 4 || month === 6 || month === 9 || month === 11)) {
      day = 1;
      month++;
    }

    if (day === 31) {
      if (month === 12) {
        day = 1;
        month = 1;
        year++;
      } else {
        day = 1;
        month++;
      }
    }
    else
      day++;

    return new Date(year, month - 1, day);
  }
}
