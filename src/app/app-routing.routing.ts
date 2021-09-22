import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : '', 
    loadChildren:()=>import('./formula/formula/formula.module').then(m=>m.FormulaModule)
   },
   {
    path : 'form',
    loadChildren:()=>import('./form/form.module').then(m=>m.FormModule)
   },
     
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutes { }
