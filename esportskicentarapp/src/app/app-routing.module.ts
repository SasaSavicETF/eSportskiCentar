import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradComponent } from './grad/grad.component';
import { DvoranaComponent } from './dvorana/dvorana.component';
import { SportComponent } from './sport/sport.component';
import { UlazComponent } from './ulaz/ulaz.component';
import { TakmicenjeComponent } from './takmicenje/takmicenje.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RasporedComponent } from './raspored/raspored.component';
import { EkipaComponent } from './ekipa/ekipa.component';
import { TipTerenaComponent } from './tip-terena/tip-terena.component';
import { TerenComponent } from './teren/teren.component';
import { CjenovnikComponent } from './cjenovnik/cjenovnik.component';
import { ZadatakComponent } from './zadatak/zadatak.component';


const routes: Routes = [
  //ovo prvo je samo privremeno
  { path: 'cjenovnik', component: CjenovnikComponent},
  { path: 'grad', component: GradComponent},
  { path: 'dvorana', component: DvoranaComponent},
  { path: 'sport', component: SportComponent},
  { path: 'ulaz', component: UlazComponent},
  { path: 'takmicenje', component: TakmicenjeComponent},
  { path: 'raspored', component: RasporedComponent},
  { path: 'ekipa', component: EkipaComponent},
  { path: 'tipTerena', component: TipTerenaComponent},
  { path: 'teren', component: TerenComponent},
  { path: 'zadatak', component: ZadatakComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
