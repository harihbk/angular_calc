
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor(private _httpClient : HttpClient) {

 
 }


getUsers(page:any): Observable<any>{
  return this._httpClient
  .get(`${environment.APIURL}/formula?page=${page}`).pipe(
    switchMap((response:any)=>{
      return of(response);
    })
  );
}

calculatevalue(formula : any){


  const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':  '*',
    'Accept': 'application/json',
   })};


  return this._httpClient
  .post("http://localhost:3000/",formula,httpOptions).pipe(
    switchMap((response:any)=>{
      return of(response);
    })
  );
}

  getDynamicfields():FormlyFieldConfig[] {
     return  [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'First Name',
        },
      },
      {
        key: 'address',
        templateOptions: { label: 'Address' },
        fieldGroup: [{
          key: 'town',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Address',
          },
        },
        {
          key: 'city',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'city',
          },
        }],
      },
      {
        key: 'Select',
        type: 'select',
        templateOptions: {
          label: 'Select',
          placeholder: 'Placeholder',
          description: 'Description',
          required: true,
          change: ($event:any) => { 
           this.onchange($event);
          },
          options: [
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2'  },
            { value: 3, label: 'Option 3'  },
            { value: 4, label: 'Option 4', disabled: true },
          ],
        },
      },
    ];
  }
  onchange($event: any) {
   
   console.log($event);
  }

}


