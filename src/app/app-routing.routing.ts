import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path : '', 
    loadChildren:()=>import('./formula/formula/formula.module').then(m=>m.FormulaModule)
   },
   {
    path : 'form',
    loadChildren:()=>import('./form/form.module').then(m=>m.FormModule)
   },
   {
    path : 'price',
    loadChildren:()=>import('./pricelist/pricelist.module').then(m=>m.PricelistModule)
   },
   {
     path :'calendar',
     loadChildren:()=>import('./calendar/calendar.module').then(m=>m.CalendarModule)
   }

     
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutes { }
