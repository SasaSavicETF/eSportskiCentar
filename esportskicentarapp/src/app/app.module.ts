import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GradComponent } from './grad/grad.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { DvoranaComponent } from './dvorana/dvorana.component';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SportComponent } from './sport/sport.component';
import { UlazComponent } from './ulaz/ulaz.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TakmicenjeComponent } from './takmicenje/takmicenje.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RasporedComponent } from './raspored/raspored.component';
import { EkipaComponent } from './ekipa/ekipa.component';

@NgModule({
  declarations: [
    AppComponent,
    GradComponent,
    DvoranaComponent,
    SportComponent,
    UlazComponent,
    TakmicenjeComponent,
    PageNotFoundComponent,
    RasporedComponent,
    EkipaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    SplitterModule,
    DropdownModule,
    ToastModule,
    CheckboxModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
