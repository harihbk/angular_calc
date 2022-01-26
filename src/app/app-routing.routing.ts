import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeweventComponent } from './cal/newevent/newevent.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ExcelComponent } from './excel/excel.component';
import { LayoutComponent } from './layout/layout/layout.component';

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
   },
   {
     path : 'calcmodule',
     loadChildren:()=>import('./calcmodule/calcmodule.module').then(m=>m.CalcmoduleModule)
   },
   {
    path : '',
    component:LayoutComponent,
    children   : [
      {
     path : 'cal',
     loadChildren:()=>import('./cal/cal.module').then(m=>m.CalModule)
      }
    ]
   },
   {
    path : 'popup',
    loadChildren:()=>import('./cal/newevent/newevent.module').then(m=>m.CalModule)
  },

  {
    path : 'canvas',
    loadChildren:()=>import('./canvas/canvas.module').then(m=>m.CanvasModule)
  },

  // {
  //   path : 'excel',
  //   loadChildren:()=>import('./excel/excel.module').then(m=>m.ExcelModule)
  // },
  {

    path : '',
    component:LayoutComponent,
    children   : [
      {
        path : '',
       children : [
        {
          path : 'excel',
          loadChildren:()=>import('./excel/excel.module').then(m=>m.ExcelModule)
        }
       ]

      }

      ]



},
  {

        path : '',
       // component:LayoutComponent,
        children   : [
          {
            path : 'mail',
            loadChildren:()=>import('./mail/mail.module').then(m=>m.MailModule)


          }

          ]



  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutes { }
