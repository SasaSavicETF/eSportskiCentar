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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //ovo prvo je samo privremeno
  { path: 'cjenovnik', component: CjenovnikComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'grad', component: GradComponent},
  { path: 'dvorana', component: DvoranaComponent},
  { path: 'sport', component: SportComponent},
  { path: 'ulaz', component: UlazComponent},
  { path: 'takmicenje', component: TakmicenjeComponent},
  { path: 'raspored', component: RasporedComponent},
  { path: 'ekipa', component: EkipaComponent},
  { path: 'tipterena', component: TipTerenaComponent},
  { path: 'teren', component: TerenComponent},
  { path: 'zadatak', component: ZadatakComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
