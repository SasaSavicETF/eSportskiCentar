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
import { TipTerenaComponent } from './tip-terena/tip-terena.component';
import { TerenComponent } from './teren/teren.component';
import { ImageModule } from 'primeng/image';
import { CjenovnikComponent } from './cjenovnik/cjenovnik.component';
import { ZadatakComponent } from './zadatak/zadatak.component';
import { CalendarModule } from 'primeng/calendar';
import { UpravnikComponent } from './upravnik/upravnik.component';
import { DezurniRadnikComponent } from './dezurni-radnik/dezurni-radnik.component';
import { SvlacionicaComponent } from './svlacionica/svlacionica.component';
import { InventarComponent } from './inventar/inventar.component';
import { DnevniRasporedComponent } from './dnevni-raspored/dnevni-raspored.component';
import { DogadjajComponent } from './dogadjaj/dogadjaj.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DezurniRadnikIndexComponent } from './dezurni-radnik-index/dezurni-radnik-index.component';
import { DogadjajPregledComponent } from './dogadjaj-pregled/dogadjaj-pregled.component'
import { PaginatorModule } from 'primeng/paginator';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChartModule } from 'primeng/chart';

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
    EkipaComponent,
    TipTerenaComponent,
    TerenComponent,
    CjenovnikComponent,
    ZadatakComponent,
    UpravnikComponent,
    DezurniRadnikComponent,
    SvlacionicaComponent,
    InventarComponent,
    DnevniRasporedComponent,
    DogadjajComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DezurniRadnikIndexComponent,
    DogadjajPregledComponent,
    AdminPanelComponent
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
    CheckboxModule,
    ImageModule,
    CalendarModule,
    TimelineModule,
    CardModule,
    PaginatorModule,
    ChartModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
