import { Routes, RouterModule } from '@angular/router';
import { NeweventComponent } from './newevent.component';

const routes: Routes = [
  {
    path : '',
    component:NeweventComponent
  },
];

export const NeweventRoutes = RouterModule.forChild(routes);
