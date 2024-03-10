import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradComponent } from './grad/grad.component';

const routes: Routes = [
  { path: 'grad', component: GradComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
