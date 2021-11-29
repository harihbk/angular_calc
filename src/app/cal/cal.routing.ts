import { Routes, RouterModule } from '@angular/router';
import { CalcmoduleComponent } from '../calcmodule/calcmodule.component';
import { CalComponent } from './cal.component';

const routes: Routes = [
  {
    path : '',
    component : CalComponent
   },
];

export const CalRoutes = RouterModule.forChild(routes);
