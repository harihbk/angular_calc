import { Routes, RouterModule } from '@angular/router';
import { ExcelComponent } from './excel.component';

const routes: Routes = [
  {
    path : '',
    component : ExcelComponent
   },
];

export const ExcelRoutes = RouterModule.forChild(routes);
