import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';

const routes: Routes = [
  { 
    path : '',
    component : FormComponent
   },
];

export const FormRoutes = RouterModule.forChild(routes);
