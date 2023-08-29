import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private connectedChanged = new Subject<boolean>();
  private disconnectedChanged = new Subject<boolean>();
  private newRequestRecieved = new Subject<any>();

  connectedChanged$ = this.connectedChanged.asObservable();
  disconnectedChanged$ = this.connectedChanged.asObservable();
  newRequestRecieved$ = this.newRequestRecieved.asObservable();
  

  emitConnectedChange(connected: boolean) {
    this.connectedChanged.next(connected);
  }

  emitDisconnectedChange(disconnected: boolean) {
    this.disconnectedChanged.next(disconnected);
  }

  emitnewRequestRecieved(request:any) {
    this.newRequestRecieved.next(request);
  }

}
