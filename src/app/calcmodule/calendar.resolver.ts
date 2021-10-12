import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CalendarService } from '../calcmodule/services/calendar.service'
@Injectable({
  providedIn: 'root'
})



export class CalendarResolver implements Resolve<boolean> {

  constructor(
    public service : CalendarService
  ){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    this.service.UpdateRefreshToken()
    this.service.ListCalendarEvents()
    return this.service.getData();
   // return of(true);
  }
}
