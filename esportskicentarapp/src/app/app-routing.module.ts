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
import { DogadjajPregledComponent } from './dogadjaj-pregled/dogadjaj-pregled.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminOdobravanjeComponent } from './admin-odobravanje/admin-odobravanje.component';
import { IndexComponent } from './index/index.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { adminGuard } from './guards/admin.guard';
import { dezurniGuard } from './guards/dezurni.guard';
import { upravnikGuard } from './guards/upravnik.guard';
import { userGuard } from './guards/user.guard';
import { comboGuard } from './guards/combo.guard';
import { adminUpravnikGuard } from './guards/admin-upravnik.guard';

const routes: Routes = [
  //ovo prvo je samo privremeno
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'admin/odabirDogadjaja', component: AdminOdobravanjeComponent, canActivate : [upravnikGuard]},
  { path: 'cjenovnik', component: CjenovnikComponent, canActivate : [upravnikGuard]},
  { path: 'inventar', component: InventarComponent, canActivate : [upravnikGuard]},
  { path: 'dnevniRaspored', component: DnevniRasporedComponent, canActivate : [adminUpravnikGuard]},
  { path: 'raspored', component: RasporedComponent, canActivate : [adminUpravnikGuard]},
  { path: 'dogadjaj', component: DogadjajComponent, canActivate: [comboGuard]},
  { path: 'dogadjajPregled', component: DogadjajPregledComponent, canActivate: [userGuard]},
  { path: 'dvorana', component: DvoranaComponent, canActivate : [adminGuard]},
  { path: 'administrator', component: AdministratorComponent, canActivate : [adminGuard]},
  { path: 'adminPanel', component: AdminPanelComponent, canActivate : [adminGuard]},
  { path: 'sport', component: SportComponent, canActivate : [adminGuard]},
  { path: 'ekipa', component: EkipaComponent, canActivate : [adminGuard]},
  { path: 'tipterena', component: TipTerenaComponent, canActivate : [adminGuard]},
  { path: 'grad', component: GradComponent, canActivate : [adminGuard]},
  { path: 'dezurniRadnik', component: DezurniRadnikComponent},
  { path: 'ulaz', component: UlazComponent, canActivate : [adminUpravnikGuard]},
  { path: 'svlacionica', component: SvlacionicaComponent, canActivate : [adminUpravnikGuard]},
  { path: 'takmicenje', component: TakmicenjeComponent, canActivate : [adminUpravnikGuard]},
  { path: 'teren', component: TerenComponent, canActivate : [adminUpravnikGuard]},
  { path: 'index', component: IndexComponent},
  { path: 'upravnik', component: UpravnikComponent},
  { path: 'zadatak', component: ZadatakComponent},
  { path: 'radnik/zadaci', component: DezurniRadnikIndexComponent, canActivate: [dezurniGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
