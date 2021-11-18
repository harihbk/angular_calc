import { Routes, RouterModule } from '@angular/router';
import { CalcmoduleComponent } from './calcmodule.component';
import { CalendarResolver } from './calendar.resolver';

const routes: Routes = [
  {
    path : '',
    component : CalcmoduleComponent,
    resolve:{
      data : CalendarResolver
    }
   },
];

export const CalcmoduleRoutes = RouterModule.forChild(routes);
