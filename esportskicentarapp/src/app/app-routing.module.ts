import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradComponent } from './grad/grad.component';
import { DvoranaComponent } from './dvorana/dvorana.component';

const routes: Routes = [
  { path: 'grad', component: GradComponent},
  { path: 'dvorana', component: DvoranaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
