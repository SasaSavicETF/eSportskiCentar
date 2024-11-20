import { Component, OnInit } from '@angular/core';
import { Transakcija } from '../models/transakcija';
import { TransakcijaService } from './transakcija.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transakcija',
  templateUrl: './transakcija.component.html',
  styleUrl: './transakcija.component.css'
})
export class TransakcijaComponent implements OnInit
{
  public transakcijas: Transakcija[] = [];

  constructor(private transakcijaService: TransakcijaService) { }

  ngOnInit(): void
  {
    this.getTransakcijas();
  }

  public getTransakcijas(): void
  {
    this.transakcijaService.getTransakcijas().subscribe(
      (response: Transakcija[]) => {
        this.transakcijas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
