import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradComponent } from './grad/grad.component';
import { DvoranaComponent } from './dvorana/dvorana.component';
import { SportComponent } from './sport/sport.component';
import { UlazComponent } from './ulaz/ulaz.component';


const routes: Routes = [
  { path: 'grad', component: GradComponent},
  { path: 'dvorana', component: DvoranaComponent},
  { path: 'sport', component: SportComponent},
  { path: 'ulaz', component: UlazComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
