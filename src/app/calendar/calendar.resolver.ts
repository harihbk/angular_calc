import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CalendarService } from '../calendar/calendar.service';
@Injectable({
  providedIn: 'root'
})



export class CalendarResolver implements Resolve<boolean> {

  constructor(
    public service : CalendarService
  ){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.service.UpdateRefreshToken()
    return of(true);
  }
}
