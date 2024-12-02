import { Component, OnInit } from '@angular/core';
import { Transakcija } from '../models/transakcija';
import { TransakcijaService } from './transakcija.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from '../models/user-dto';
import { MessageService } from 'primeng/api';
import { KlijentService } from '../services/klijent.service';
import { CheckboxModule } from 'primeng/checkbox';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transakcija',
  templateUrl: './transakcija.component.html',
  styleUrl: './transakcija.component.css',
  providers: [MessageService, CheckboxModule]
})
export class TransakcijaComponent implements OnInit
{
  
  public transakcijas: Transakcija[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editTransakcija: Transakcija | undefined;
  public delTransakcija: Transakcija | undefined;
  public infoTransakcija: Transakcija | undefined;
  public delIdTransakcija: number = -1;

  ulazniKlijent: UserDTO | null = this.klijentService.activeUser;

  checkedAdd: boolean = false;
  checkedEdit: boolean = false;


  constructor(private transakcijaService: TransakcijaService, private messageService: MessageService,
    private klijentService: KlijentService) { }


  ngOnInit(): void 
  {
      this.getTransakcijas();
  }

  public getTransakcijas(): void
  {
    this.transakcijaService.getTransakcijas().subscribe(
      (response: Transakcija[]) => 
      {
        this.transakcijas = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddTransakcija(addForm: NgForm): void
  {
    this.addVisible = false;
    this.transakcijaService.addTransakcija(addForm.value).subscribe(
      (response: Transakcija) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Transakcija je dodana u sistem!' });
        this.getTransakcijas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju transakcije' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateTransakcija(transakcija: Transakcija): void
  {
    this.editVisible = false;
    this.transakcijaService.updateTransakcija(transakcija).subscribe(
      (response: Transakcija) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Transakcija je izmjenjena!' });
        this.getTransakcijas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni transakcije' });
        alert(error.message);
      }
    );
  }

  public onDeleteTransakcija(idTransakcija: number): void
  {
    this.deleteVisible = false;
    this.transakcijaService.deleteTransakcija(idTransakcija).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Transakcija je obrisana sa sistema!' });
        this.getTransakcijas();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju transakcije' });
        alert(error.message);
      }
    );
  }

  public searchTransakcijas(key: string): void
  {
    const results: Transakcija[] = [];
    for(const transakcija of this.transakcijas)
    {
      if((transakcija.svrhaDoznake.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(transakcija);
      }
    }
    this.transakcijas = results;
    if(!key)
    {
      this.getTransakcijas();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(transakcija: Transakcija) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editTransakcija = { ...transakcija };
      this.checkedEdit = transakcija.prihod;
    }
  }

  showDeleteDialog(transakcija: Transakcija) 
  {
    this.deleteVisible = true;
    this.delTransakcija = { ...transakcija };
    this.delIdTransakcija = this.delTransakcija.idTransakcija;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }

}
