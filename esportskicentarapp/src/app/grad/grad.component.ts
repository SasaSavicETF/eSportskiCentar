import { Component, OnInit } from '@angular/core';
import { Grad } from '../models/grad';
import { GradService } from './grad.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrl: './grad.component.css',
  providers: [MessageService]
})
export class GradComponent implements OnInit {
  public grads: Grad[] = [];
  addVisible: boolean = false;
  editVisible: boolean = false;
  deleteVisible: boolean = false;

  public editGrad: Grad | undefined;
  public delGrad: Grad | undefined;
  public delIdGrad: number = -1;

  public nazivGradaInput: string = "";

  constructor(private gradService: GradService, private messageService: MessageService) { }


  ngOnInit(): void 
  {
    this.getGrads();
  }

  public getGrads(): void
  {
    this.gradService.getGrads().subscribe(
      (response: Grad[]) =>
      {
        this.grads = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public onAddGrad(addForm: NgForm): void
  {
    this.addVisible = false;
    this.gradService.addGrad(addForm.value).subscribe(
      (response: Grad) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno dodavanje', detail: 'Grad je dodan u sistem!' });
        this.getGrads();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u dodavanju grada' });
        alert(error.message);
      }
    );
    addForm.reset();
  }

  public onUpdateGrad(grad: Grad): void
  {
    this.editVisible = false;
    this.gradService.updateGrad(grad).subscribe(
      (response: Grad) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješna izmjena', detail: 'Grad je izmjenjen!' });
        this.getGrads();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u izmjeni grada' });
        alert(error.message);
      }
    );
  }

  public onDeleteGrad(idGrad: number): void
  {
    this.deleteVisible = false;
    this.gradService.deleteGrad(idGrad).subscribe(
      (response: void) => {
        this.messageService.add({ severity: 'success', summary: 'Uspješno brisanje', detail: 'Grad je obrisan sa sistema!' });
        this.getGrads();
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Greška', detail: 'Greška u brisanju grada' });
        alert(error.message);
      }
    );
  }

  public searchGrads(key: string): void
  {
    const results: Grad[] = [];
    for(const grad of this.grads)
    {
      if(grad.nazivGrada.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(grad);
      }
    }
    this.grads = results;
    if(!key)
    {
      this.getGrads();
    }
  }

  showAddDialog() 
  {
    this.addVisible = true;
  }

  showEditDialog(grad: Grad) 
  {
    if(this.editVisible == false)
    {
      this.editVisible = true;
      this.editGrad = { ...grad };
    }
  }

  showDeleteDialog(grad: Grad) 
  {
    this.deleteVisible = true;
    this.delGrad = { ...grad };
    this.delIdGrad = this.delGrad.idGrad;
  }

  closeDeleteDialog()
  {
    this.deleteVisible = false;
  }
}
