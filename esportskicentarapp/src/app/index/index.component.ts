/*import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit, OnDestroy 
{
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'selector');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'selector');
  }
}*/

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Teren } from '../models/teren';
import { Dvorana } from '../models/dvorana';
import { TerenService } from '../teren/teren.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Upravnik } from '../models/upravnik';
import { UpravnikService } from '../upravnik/upravnik.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit
{
  public terens: Teren[] = [];
  public upravniks: Upravnik[] = [];

  ngOnInit(): void 
  {
    this.getTerens();
    this.getUpravniks();
  }

  constructor(private terenService: TerenService, private upravnikService: UpravnikService) { }

  public getUpravniks(): void
  {
    this.upravnikService.getUpravniks().subscribe(
      (response: Upravnik[]) => {
        let counter = 0;
        const filteredUpravniks: Upravnik[] = [];
        for(let upravnik of response)
        {
          if(counter == 4)
          {
            break;
          }
          filteredUpravniks.push(upravnik);
          counter++;
        }
        this.upravniks = filteredUpravniks;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public getTerens(): void
  {
    this.terenService.getTerens().subscribe(
      (response: Teren[]) => 
      {
        let counter = 0;
        const filteredTerens: Teren[] = [];
        for(let teren of response)
        {
          if(counter == 4)
          {
            break;
          }
          filteredTerens.push(teren);
          counter++;
        }
        this.terens = filteredTerens;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }
}

