import { ColumnsToolPanelModule } from '@ag-grid-enterprise/all-modules';
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
  response: any;
  Logged_user: any;

  constructor(
    public http:HttpClient,
    private googleAuth: GoogleAuthService,
    private service : CalendarService
   
  ) {
    this.getUserData();
   }

  ngOnInit() {
   
  //   this.service.ListCalendarEvents().subscribe(
  //     (res:any) => {
  //       console.log(res.items);
  //      this.response = res.items
  //     },
  //     error => console.log
  // );
  }

  

   handleAuthClick() {
    this.service.CalendarLogin()

}

InsertCalendarEvents(){

  let body = {
    "end": {
      "date": "2021-10-1"
    },
    "start": {
      "date": "2021-10-1"
    },
    "summary": "hari hari yyyyynnnn"
  }

  this.service.InsertCalendarEvents(body).subscribe(res=>{
    console.log(res);
    
  })
}

UpdateCalendarEvents(){

  let body = {
    "end": {
      "date": "2021-10-1"
    },
    "start": {
      "date": "2021-10-1"
    },
    "summary": "hari bbbbbbnnnnnn"
  }

  let Event_id = 'kttogd7f1ml9mueadtvnka0f24';

  this.service.UpdateCalendarEvents(body,Event_id).subscribe(res=>{
    console.log(res);
    
  })

}

getUserData(){
  this.service.getUserData().subscribe((res:any)=>{
   this.Logged_user = res.items[0].scope.value;
  })
}


}
