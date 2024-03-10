import { Component, OnInit } from '@angular/core';
import { Grad } from '../models/grad';
import { GradService } from './grad.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrl: './grad.component.css'
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

  constructor(private gradService: GradService) { }


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
        console.log(response);
        this.getGrads();
      },
      (error: HttpErrorResponse) => {
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
        console.log(response);
        this.getGrads();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteGrad(idGrad: number): void
  {
    this.deleteVisible = false;
    this.gradService.deleteGrad(idGrad).subscribe(
      (response: void) => {
        console.log(response);
        this.getGrads();
      },
      (error: HttpErrorResponse) => {
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
