import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventemitterService {
  public subject = new Subject<boolean>();

  sendMessage(message: boolean) {
      this.subject.next(message);
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<boolean> {

      return this.subject.asObservable();
  }

}
