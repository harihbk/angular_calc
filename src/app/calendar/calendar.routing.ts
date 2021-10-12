import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { CalendarResolver } from '../calendar/calendar.resolver';
const routes: Routes = [
  {
    path :'',
    component:CalendarComponent,
    resolve:{
      data : CalendarResolver
    }
  }
];

export const CalendarRoutes = RouterModule.forChild(routes);
