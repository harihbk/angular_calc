import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas.component';

const routes: Routes = [
  {
    path : '',
    component : CanvasComponent
   },
];

export const CanvasRoutes = RouterModule.forChild(routes);
