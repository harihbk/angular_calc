import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CalendarService } from './calendar.service';

declare var gapi: any
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  loggedIn: boolean;

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: any;
  refreshToken: boolean = false;
  accessToken: boolean;

  constructor(
    public http:HttpClient,
    private googleAuth: GoogleAuthService,
    private service : CalendarService
   
  ) { }

  ngOnInit() {
   
    this.service.ListCalendarEvents().subscribe(
      (res:any) => {
       console.log(res);
      },
      error => console.log
  );
  }

  

   handleAuthClick() {
    this.service.CalendarLogin()

}





}
