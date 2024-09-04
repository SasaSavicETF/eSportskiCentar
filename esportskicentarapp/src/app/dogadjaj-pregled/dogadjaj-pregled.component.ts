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
    //if(this.klijentService.activeUser != null) {
   this.dogadjajService.getDogadjajsOfUser(2).subscribe(
      (response: Dogadjaj[]) => 
      {
        this.dogadjajs = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
    this.updatePaginatedDogadjajs();
  //}
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
    if (this.currentPage >= totalPages) {
        this.currentPage = (totalPages - 1) * this.rowsPerPage;
    }
   
    const startIndex = this.currentPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedDogadjajs = this.dogadjajs.slice(startIndex, endIndex);
}

}
