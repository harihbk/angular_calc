import { Injectable } from '@angular/core';

import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private service : CalendarService
  ) { }  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     

  // Refresh token
  this.service.UpdateRefreshToken().subscribe(res=>{

  },err=>{
    console.log(err);
    
  })
  // Refresh token
      
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.service.GetAccessToken}`,
      'Content-Type': 'application/json'
    });
    const cloneReq = req.clone({headers});
    return next.handle(cloneReq);

  }

}