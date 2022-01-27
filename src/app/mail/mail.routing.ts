import { Routes, RouterModule } from '@angular/router';
import { MailComponent } from './mail.component';

const routes: Routes = [
  {
    path : '',
    component : MailComponent
   },
];

export const MailRoutes = RouterModule.forChild(routes);
