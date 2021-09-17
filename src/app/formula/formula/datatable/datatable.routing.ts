import { Routes, RouterModule } from '@angular/router';
import { DatatableComponent } from './datatable.component';

const routes: Routes = [
  {
    path : '',
    component : DatatableComponent
   },
];

export const DatatableRoutes = RouterModule.forChild(routes);
