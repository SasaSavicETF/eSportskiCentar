import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Svlacionica } from '../models/svlacionica';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SvlacionicaService } from './svlacionica.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dvorana } from '../models/dvorana';
import { DvoranaService } from '../dvorana/dvorana.service';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-svlacionica',
  templateUrl: './svlacionica.component.html',
  styleUrl: './svlacionica.component.css',
  providers: [MessageService, CheckboxModule]
})
export class SvlacionicaComponent {

  public svlacionicas: Svlacionica[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;
  infoVisible: boolean = false;

  public editSvlacionica: Svlacionica | undefined;
  public delSvlacionica: Svlacionica | undefined;
  public infoSvlacionica: Svlacionica | undefined;
  public delIdSvlacionica: number = -1;

  checkedAdd: boolean = false;
  checkedEdit: boolean = false;

  dvoranas: Dvorana[] = [];
  selectedDvorana: Dvorana | undefined;

  constructor(private svlacionicaService: SvlacionicaService, private dvoranaService: DvoranaService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
      this.getSvlacionicas();
      this.getDvoranas();
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

  public getSvlacionicas(): void
  {
    this.svlacionicaService.getSvlacionicas().subscribe(
      (response: Svlacionica[]) => 
      {
        this.svlacionicas = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddSvlacionica(addForm: NgForm): void
  {
    this.addVisible = false;
    this.svlacionicaService.addSvlacionica(addForm.value).subscribe(
      (response: Svlacionica) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Svlacionica je dodana u sistem!' });
        this.getSvlacionicas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju svlacionice' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateSvlacionica(svlacionica: Svlacionica): void
  {
    this.editVisible = false;
    this.svlacionicaService.updateSvlacionica(svlacionica).subscribe(
      (response: Svlacionica) =>
      {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Svlacionica je izmjenjena!' });
        this.getSvlacionicas();
      },
      (error: HttpErrorResponse) =>
      {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni svlacionice' });
        alert(error.message);
      }
    );
  }

  public onDeleteSvlacionica(idSvlacionica: number): void
  {
    this.deleteVisible = false;
    this.svlacionicaService.deleteSvlacionica(idSvlacionica).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Svlacionica je obrisana sa sistema!' });
        this.getSvlacionicas();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju svlacionice' });
        alert(error.message);
      }
    );
  }

  public searchSvlacionicas(key: string): void
  {
    const results: Svlacionica[] = [];
    for(const svlacionica of this.svlacionicas)
    {
      if((svlacionica.dvorana.nazivDvorane.toLowerCase().indexOf(key.toLowerCase()) !== -1) )
      {
        results.push(svlacionica);
      }
    }
    this.svlacionicas = results;
    if(!key)
    {
      this.getSvlacionicas();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(svlacionica: Svlacionica) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editSvlacionica = { ...svlacionica };
      this.checkedEdit = svlacionica.dostupna;
      this.selectedDvorana = this.editSvlacionica.dvorana;
    }
  }

  showDeleteDialog(svlacionica: Svlacionica) 
  {
    this.deleteVisible = true;
    this.delSvlacionica = { ...svlacionica };
    this.delIdSvlacionica = this.delSvlacionica.idSvlacionica;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}

