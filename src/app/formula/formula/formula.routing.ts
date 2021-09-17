import { Routes, RouterModule } from '@angular/router';
import { Child_safteyComponent } from './child_saftey/child_saftey.component';
import { DatatableComponent } from './datatable/datatable.component';
import { FormulaComponent } from './formula.component';
import { Manufacturing_formulaComponent } from './manufacturing_formula/manufacturing_formula.component';

const routes: Routes = [
  { path: '', redirectTo: 'manufacture', pathMatch: 'full' },
  {
    path : '',
    component : FormulaComponent,
    children:[
      {
        path : 'manufacture',
        component : Manufacturing_formulaComponent,
        children:[
          {
            path : '',
            loadChildren:()=>import('./datatable/datatable.module').then(m=>m.DatatableModule),
            data : {find : 'formula'}
          },
          {
            path : 'allowance',
            loadChildren:()=>import('./datatable/datatable.module').then(m=>m.DatatableModule),
            data : {find : 'allowance'}
          },

        ]
       },
       {
         path :'child',
         component : Child_safteyComponent
       }
    ]
   },


];

export const FormulaRoutes = RouterModule.forChild(routes);
