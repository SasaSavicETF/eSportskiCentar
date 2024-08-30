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

import { UpravnikComponent } from './upravnik/upravnik.component';
import { DezurniRadnikComponent } from './dezurni-radnik/dezurni-radnik.component';
import { SvlacionicaComponent } from './svlacionica/svlacionica.component';
import { DnevniRasporedComponent } from './dnevni-raspored/dnevni-raspored.component';
import { DogadjajComponent } from './dogadjaj/dogadjaj.component';
import { InventarComponent } from './inventar/inventar.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DezurniRadnikIndexComponent } from './dezurni-radnik-index/dezurni-radnik-index.component';


const routes: Routes = [
  //ovo prvo je samo privremeno
  { path: 'cjenovnik', component: CjenovnikComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'grad', component: GradComponent},
  { path: 'inventar', component: InventarComponent},
  { path: 'dnevniRaspored', component: DnevniRasporedComponent},
  { path: 'dogadjaj', component: DogadjajComponent},
  { path: 'dvorana', component: DvoranaComponent},
  { path: 'dezurniRadnik', component: DezurniRadnikComponent},
  { path: 'sport', component: SportComponent},
  { path: 'ulaz', component: UlazComponent},
  { path: 'svlacionica', component: SvlacionicaComponent},
  { path: 'takmicenje', component: TakmicenjeComponent},
  { path: 'raspored', component: RasporedComponent},
  { path: 'ekipa', component: EkipaComponent},
  { path: 'tipterena', component: TipTerenaComponent},
  { path: 'teren', component: TerenComponent},
  { path: 'upravnik', component: UpravnikComponent},
  { path: 'zadatak', component: ZadatakComponent},
  { path: 'radnik/zadaci', component: DezurniRadnikIndexComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
