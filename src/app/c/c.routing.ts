import { Routes, RouterModule } from '@angular/router';
import { CComponent } from './c.component';

const routes: Routes = [
  {
    path : '',
    component : CComponent
   },
];

export const CRoutes = RouterModule.forChild(routes);
