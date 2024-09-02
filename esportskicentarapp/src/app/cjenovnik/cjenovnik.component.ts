import { Component, OnInit } from '@angular/core';
import { Cjenovnik } from '../models/cjenovnik';
import { Teren } from '../models/teren';
import { CjenovnikService } from './cjenovnik.service';
import { TerenService } from '../teren/teren.service';
import { MessageService } from 'primeng/api';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cjenovnik',
  templateUrl: './cjenovnik.component.html',
  styleUrl: './cjenovnik.component.css',
  providers: [MessageService]
})
export class CjenovnikComponent implements OnInit {

  public cjenovniks: Cjenovnik[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editCjenovnik: Cjenovnik | undefined;
  public delCjenovnik: Cjenovnik | undefined;
  public infoCjenovnik: Cjenovnik | undefined;
  public delIdCjenovnik: number = -1;

  defaultDate: Date = new Date("January 31 1980 12:30");

  terens: Teren[] = [];
  selectedTeren: Teren | undefined;

  constructor(private cjenovnikService: CjenovnikService, private terenService: TerenService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCjenovniks();
    this.getTerens();
  }

  public getTerens(): void {
    this.terenService.getTerens().subscribe(
      (response: Teren[]) => {
        this.terens = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCjenovniks(): void {
    this.cjenovnikService.getCjenovniks().subscribe(
      (response: Cjenovnik[]) => {
        this.cjenovniks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCjenovnik(addForm: NgForm): void {
    console.log(addForm.value);
    this.addVisible = false;
    this.cjenovnikService.addCjenovnik(addForm.value).subscribe(
      (response: Cjenovnik) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Cjenovnik je dodan u sistem!' });
        this.getCjenovniks();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju cjenovnika' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateCjenovnik(cjenovnik: Cjenovnik): void {
    this.editVisible = false;
    this.cjenovnikService.updateCjenovnik(cjenovnik).subscribe(
      (response: Cjenovnik) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Cjenovnik je izmjenjen!' });
        this.getCjenovniks();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni cjenovnika' });
        alert(error.message);
      }
    );
  }

  public onDeleteCjenovnik(idCjenovnik: number): void {
    this.deleteVisible = false;
    this.cjenovnikService.deleteCjenovnik(idCjenovnik).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Cjenovnik je obrisan sa sistema!' });
        this.getCjenovniks();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju cjenovnika' });
        alert(error.message);
      }
    );
  }
  
    public searchCjenovniks(key: string): void
    {
      const results: Cjenovnik[] = [];
      for(const cjenovnik of this.cjenovniks)
      {
        if((cjenovnik.teren.nazivTerena.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
        {
          results.push(cjenovnik);
        }
      }
      this.cjenovniks = results;
      if(!key)
      {
        this.getCjenovniks();
      }
    }
  
  showAddDialog() {
    this.addVisible = true;
  }

  showEditDialog(cjenovnik: Cjenovnik) {
    if (this.editVisible == false) {
      this.editVisible = true;
      this.editCjenovnik = { ...cjenovnik };
      this.selectedTeren = this.editCjenovnik.teren;
    }
  }

  showDeleteDialog(cjenovnik: Cjenovnik) {
    this.deleteVisible = true;
    this.delCjenovnik = { ...cjenovnik };
    this.delIdCjenovnik = this.delCjenovnik.idCjenovnik;
  }

  closeDeleteDialog() {
    this.deleteVisible = false;
  }
}
