import { Routes, RouterModule } from '@angular/router';
import { PricelistComponent } from './pricelist.component';

const routes: Routes = [
  { 
    path : '',
    component : PricelistComponent
   },
];

export const PricelistRoutes = RouterModule.forChild(routes);
