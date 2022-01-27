import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { from, of, pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment  } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  usersdata: Object;

constructor(
  public http:HttpClient,
) { }


  postmethod(methodname,data:any){
    return this.http.post(`${environment.APIURL}/${methodname}`,data)
  }

  getusers(){
    return this.http.get("https://jsonplaceholder.typicode.com/todos");
  }

  get users(){
   return this.usersdata
  }

    getuser(id){
    return   this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

}
