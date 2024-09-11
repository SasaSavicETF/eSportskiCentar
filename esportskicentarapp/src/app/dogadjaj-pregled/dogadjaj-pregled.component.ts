import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Dogadjaj } from '../models/dogadjaj';
import { HttpErrorResponse } from '@angular/common/http';
import { DogadjajService } from '../dogadjaj/dogadjaj.service';
import { KlijentService } from '../services/klijent.service';

@Component({
  selector: 'app-dogadjaj-pregled',
  templateUrl: './dogadjaj-pregled.component.html',
  styleUrl: './dogadjaj-pregled.component.css',
  providers: [CardModule, MessageService]
})
export class DogadjajPregledComponent implements OnInit{

  public dogadjajs : Dogadjaj[] = [];
  public paginatedDogadjajs: Dogadjaj[] = [];
  deleteVisible: boolean = false;
  currentPage: number = 0;
  rowsPerPage: number = 6;

  public delDogadjaj: Dogadjaj | undefined;
  public delIdDogadjaj: number = -1;

  constructor(private dogadjajService: DogadjajService, private messageService: MessageService,
  private klijentService: KlijentService) {}

  ngOnInit(): void {
   this.getDogadjajs();
  }


  getDogadjajs() {
    if(this.klijentService.activeUser !== null) {
   this.dogadjajService.getDogadjajsOfUser(this.klijentService.activeUser.id).subscribe(
      (response: Dogadjaj[]) => 
      {
        this.dogadjajs = response;
        this.updatePaginatedDogadjajs();
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }
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

  paginate(event: any) {
    this.currentPage = event.first;
    this.updatePaginatedDogadjajs();
  }

  updatePaginatedDogadjajs() {
    const totalPages = Math.ceil(this.dogadjajs.length / this.rowsPerPage);
    const currPage = this.currentPage / this.rowsPerPage;
    if (currPage >= totalPages) {
        this.currentPage = (totalPages - 1) * this.rowsPerPage;
    }
    console.log(totalPages);
    console.log(currPage);
    console.log(this.currentPage);

    const startIndex = this.currentPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedDogadjajs = this.dogadjajs.slice(startIndex, endIndex);
}

fixDate(d: string | undefined) {
  if(typeof d === 'undefined' || d === null)
    return;
 
  const parts = d.split('.');

  const day = parseInt(parts[0],10);
  const month = parseInt(parts[1],10);
  const year = parseInt(parts[2],10);

  if (month === 2) {
    if (day === 28) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return `29.02.${year}`;
        } else {
            return `01.03.${year}`;
        }
    } else if (day === 29) {
        return `01.03.${year}`;
    }
}

if (day === 30 && (month === 4 || month === 6 || month === 9 || month === 11)) {
    return `01.${String(month + 1).padStart(2, '0')}.${year}`;
}

if (day === 31) {
    if (month === 12) {
        return `01.01.${year + 1}`;
    } else {
        return `01.${String(month + 1).padStart(2, '0')}.${year}`;
    }
}
  return (day+1).toString().padStart(2,'0') + "." + month.toString().padStart(2,'0') + "." + year;
}
}
