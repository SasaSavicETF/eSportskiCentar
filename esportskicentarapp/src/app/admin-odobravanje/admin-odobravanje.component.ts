import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { Dogadjaj } from '../models/dogadjaj';
import { DogadjajService } from '../dogadjaj/dogadjaj.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-odobravanje',
  templateUrl: './admin-odobravanje.component.html',
  styleUrl: './admin-odobravanje.component.css',
  providers: [CardModule, MessageService]
})
export class AdminOdobravanjeComponent implements OnInit
{
  public dogadjajs: Dogadjaj[] = [];

  constructor(private dogadjajService: DogadjajService, private messageService: MessageService) { }

  ngOnInit(): void 
  {
    this.loadDogadjajs()
  }

  /*public getDogadjajs(): void
  {
    this.dogadjajService.getDogadjajs().subscribe(
      (response: Dogadjaj[]) => {
        this.dogadjajs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  public async loadDogadjajs(): Promise<void>
  {
    try
    {
      this.dogadjajs = await this.dogadjajService.getDogadjajs().toPromise() || [];
      const filteredDogadjajs: Dogadjaj[] = [];
      for(let dog of this.dogadjajs)
      {
        if(dog.odobren == false)
        {
          filteredDogadjajs.push(dog);
        }
      }
      this.dogadjajs = filteredDogadjajs;
    }
    catch(error)
    {
      console.log(error);
    }
  }


}
