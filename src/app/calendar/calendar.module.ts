import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { CalendarRoutes } from './calendar.routing';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutes
  ],
  providers:[
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptorService,
  //     multi: true
  // }
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
