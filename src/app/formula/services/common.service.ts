
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(private _httpClient : HttpClient) { }


getUsers(page:any): Observable<any>{
  return this._httpClient
  .get(`https://reqres.in/api/users?page=${page}`).pipe(
    switchMap((response:any)=>{
      return of(response);
    })
  );

}

}


