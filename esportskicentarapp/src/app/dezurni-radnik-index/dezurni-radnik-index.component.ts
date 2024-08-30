import { Component, OnInit } from '@angular/core';
import { Zadatak } from '../models/zadatak';
import { ZadatakService } from '../zadatak/zadatak.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dezurni-radnik-index',
  templateUrl: './dezurni-radnik-index.component.html',
  styleUrl: './dezurni-radnik-index.component.css'
})
export class DezurniRadnikIndexComponent implements OnInit
{
  public zadataks: Zadatak[] = [];

  public opcijas: string[] = ['Svi', 'Zavrseni', 'Potrebno uraditi'];
  public selectedOpcija = this.opcijas[0];

  //public mainContentVisible: boolean = false;


  constructor(private zadatakService: ZadatakService) { }


  ngOnInit(): void 
  {
    this.getZadataks();
  }

  public getZadataks(): void
  {
    this.zadatakService.getZadataks().subscribe(
      (response: Zadatak[]) => 
      {
        this.zadataks = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  public async onOpcijaChange(event: any)
  {
    await this.loadZadataks();
  }

  public async loadZadataks(): Promise<void>
  {
    try
    {
      this.zadataks = await this.zadatakService.getZadataks().toPromise() || [];
      const filteredZadataks: Zadatak[] = [];
      for(let zad of this.zadataks)
      {
        console.log(this.selectedOpcija);
        if(this.selectedOpcija == this.opcijas[0])
        {
          filteredZadataks.push(zad);
        }
        else if(this.selectedOpcija == this.opcijas[1] && zad.zavrsen)
        {
          filteredZadataks.push(zad);
        }
        else if(this.selectedOpcija == this.opcijas[2] && !zad.zavrsen)
        {
          filteredZadataks.push(zad);
        }
      }
      this.zadataks = filteredZadataks;
    }
    catch(error)
    {
      console.log(error);
    }
  }

  /*public filtriraj(): void
  {
    this.mainContentVisible = true;
  }*/
}
