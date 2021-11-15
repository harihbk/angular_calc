import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { BehaviorSubject, from, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment  } from 'src/environments/environment';

const Refresh_Token = "refreshtoken";
const Access_Token = "accesstoken";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  public _getCalendarEvents$: Subject<any> = new BehaviorSubject<Object>(null);
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

constructor(
  public http:HttpClient,
  private googleAuth: GoogleAuthService
) { }

private tokenRequestParams: any = {
  client_id: environment.Calendar_clientID,
  client_secret: environment.Calendar_ClientSecret,
  redirect_uri: environment.Redirect_url,
  grant_type: 'authorization_code'
};


  set SetAccessToken(token:any){
     localStorage.setItem(Access_Token,token);
  }

  set SetRefreshToken(token:any){
     localStorage.setItem(Refresh_Token,token);
  }

  get GetAccessToken(){
    return localStorage.getItem(Access_Token);
  }

 get getRefreshToken(){
   return localStorage.getItem(Refresh_Token);
  }


  CalendarLogin(){

    this.googleAuth.getAuth().subscribe(res=>{

      res.grantOfflineAccess().then(ress=>{
        this.fetchToken({code : ress.code})
      })
     })

  }


  private fetchToken(params:any) {
    const requestParams = {
      ...this.tokenRequestParams,
      ...params
    };

    let headers = new HttpHeaders()

    headers.set('Accept','application/json')

    return new Promise((resolve,reject)=>{
      return this.http.post(`https://oauth2.googleapis.com/token`, requestParams).toPromise().then((res:any)=>{
      console.log(res)
      this.SetAccessToken  = res.access_token;
        this.SetRefreshToken = res.refresh_token

        resolve(true)
      },err=>{
        reject(false)
      })
    })

  }


  UpdateRefreshToken(){
      let headers = new HttpHeaders()
      headers.set('Content-Type','application/x-www-form-urlencoded')

    var body1 = {
      client_id : environment.Calendar_clientID,
      client_secret : environment.Calendar_ClientSecret,
      refresh_token : this.getRefreshToken,
      grant_type     :  'refresh_token'
    }


    return this.http.post(`https://oauth2.googleapis.com/token`,body1, {headers:headers}).pipe(
      tap((res:any)=>{

        this.SetAccessToken  = res.access_token;

      })
    ).subscribe(res=>{

    })
  }
  InsertCalendarEvents(body:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.GetAccessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`,body,{headers:headers});

  }
  DeleteCalendarEvent(Event_ID:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.GetAccessToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${Event_ID}`,{headers:headers})
  }
  UpdateCalendarEvents(body:any , Event_ID){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.GetAccessToken}`,
      'Content-Type': 'application/json'
    });



    return this.http.put(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${Event_ID}`,body,{headers:headers});


  }


  get getListCalendarEvents(){
    return this._getCalendarEvents$.asObservable()
  }

    ListCalendarEvents(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.GetAccessToken}`,
        'Content-Type': 'application/json'
      });

   return  this.http.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {headers:headers})
   .pipe(

   tap(data=>{
     console.log(data);

       this._getCalendarEvents$.next(data)
    })
   ).toPromise();
  }

  get data$(): Observable<any>
  {
      return this._data.asObservable();
  }


  getData(): Observable<any>
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.GetAccessToken}`,
      'Content-Type': 'application/json'
    });

      return this.http.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {headers:headers}).pipe(
          tap((response: any) => {
              this._data.next(response);
          })
      );
  }



  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err?.error?.message}`;
    } else {

        errorMessage = `Server returned code: ${err?.status}, error message is: ${err?.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}



}
