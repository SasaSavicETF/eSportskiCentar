import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Dogadjaj } from '../models/dogadjaj';
import { AdminPanelService } from './admin-panel.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  providers: [MessageService]
})
export class AdminPanelComponent implements OnInit{

  public dogadjajs: Dogadjaj[] = [];
  public numberOfKlijents: number | undefined;
  public numberOfDogadjajs: number | undefined;
  public numberOfDvoranas: number | undefined;
  public numberOfRezervacija: number | undefined;


  eventData: any;
  data: any;
  userdata: any;
  options: any;
  selectedDate: string = "month";

  year: number;
  month: number;

  dateOptions = [
    { label: 'Posljednjih sedam dana', value: 'last7Days' },
    { label: 'Ovaj mjesec', value: 'month' },
    { label: 'Ova godina', value: 'year' },
    { label: 'Sve', value: 'all' }
  ];

  constructor(private adminPanel: AdminPanelService, private messageService: MessageService) {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
  }

  ngOnInit() {
    this.getNumberOfDogadjajs();
    this.getNumberOfKlijents();
    this.getNumberOfDvoranas();
    this.getNumberOfRezervacija();
    this.updateEventStats();

    this.data = {
        labels: [
          'Kosarka', 'Fudbal', 'Odbojka', 'Tenis', 'Hokej', 
          'Rukomet', 'Biciklizam', 'Stoni Tenis'
        ],
        datasets: [
          {
            data: [
              300, 50, 100, 25, 64, 124, 
              200, 85
            ],
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

      this.userdata = {
        labels: ['Korisnici bez rezervacija','Korisnici sa rezervacijama'],
        datasets: [
            {
                data: [300, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB"
                   
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB"
                ]
            }
        ]
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
  getNumberOfRezervacija() {
    this.adminPanel.getNumberOfRezervacija().subscribe(
      (response: number) => {
        this.numberOfRezervacija = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  getNumberOfDvoranas() {
    this.adminPanel.getNumberOfDvoranas().subscribe(
      (response: number) => {
        this.numberOfDvoranas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getNumberOfKlijents() {
    this.adminPanel.getNumberOfKlijents().subscribe(
      (response: number) => {
        this.numberOfKlijents = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getNumberOfDogadjajs() {
    this.adminPanel.getNumberOfDogadjajs().subscribe(
      (response: number) => {
        this.numberOfDogadjajs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateEventStats() {
        let labels: string[] = [];
        let dataPoints: number[] = [];
    
        if (this.selectedDate === 'last7Days') {
            labels = this.getLastSevenDays();

        }

        if (this.selectedDate === 'month') {
          labels = this.getDayLabels(this.year, this.month);
          const days = new Array(labels.length).fill(0);
    
          // Group by day in the selected month
   /*       this.dogadjajs.forEach(entry => {
            const entryDate = new Date(entry.date != null ? entry.date : 0);
            if (entryDate.getFullYear() === this.year && entryDate.getMonth() + 1 === this.month) {
              const day = entryDate.getDate() - 1; // Convert to zero-based index
              days[day] += entry.weight;
            }
          });
    */
          dataPoints = days.map(day => day > 0 ? day : null);
    
        } else if (this.selectedDate === 'year') {
          labels = this.getMonthLabels();
          const months = new Array(labels.length).fill(0);
    
          // Group by month in the selected year
     /*     this.dogadjajs.forEach(entry => {
            const entryDate = new Date(entry.date != null ? entry.date : 0);
            if (entryDate.getFullYear() === this.year) {
              const month = entryDate.getMonth(); // Zero-based index
              months[month] += entry.weight;
            }
          });*/
    
          dataPoints = months;
        } else if(this.selectedDate === 'all') {
     /*     const dates = data.map(entry => new Date(entry.date != null ? entry.date : new Date().getDate()));
          const oldest = Math.min(...dates.map(date => date.getFullYear()));
          
          labels = this.getYearLabels(oldest); 
          const years = new Array(labels.length).fill(0);
         
          this.dogadjajs.forEach(entry => {
            const entryDate = new Date(entry.date != null ? entry.date : 0);
            const year = entryDate.getFullYear();
    
            const yearIndex = labels.indexOf(year.toString());
            years[yearIndex] += entry.weight;
           
          });*/
    
         // dataPoints = years;
        }
    
        this.eventData = {
            labels: labels,
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FFA726',
                    tension: .4
                }
            ]// Keeping the datasets unchanged
          };
       // this.eventData.labels = labels;
       // this.eventData.datasets[0].data = [];
         // Refresh the chart with new data
  }

  getYearLabels(startingYear: number): string[] {
    const years: number[] = [];
    const currYear = new Date().getFullYear();
 
    if(currYear === startingYear)
     startingYear = startingYear - 5;
    for (let year = startingYear; year <= currYear; year++) {
     years.push(year);
   }
    return years.map(year => `${year}`);
   }
 
   getMonthLabels(): string[] {
     return [
       'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
       'Jul', 'Avgust', 'Septembar', 'Octobar', 'Novembar', 'Decembar'
     ];
   }
   
   getDayLabels(year: number, month: number): string[] {
     const daysInMonth = new Date(year, month, 0).getDate();
     return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
   }

   getLastSevenDays(): string[] {
    const today = new Date();
    const lastSevenDays: string[] = [];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      lastSevenDays.push(date.getDate().toString());
    }
  
    return lastSevenDays.reverse(); // To show the days in ascending order
  }
}
