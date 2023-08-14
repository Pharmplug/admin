import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private eventSource: any; // Declare as 'any' type

  constructor() { }

  connect(): Observable<MessageEvent> {
    this.eventSource = new EventSource('http://localhost:9000/api/requests');

    return new Observable((observer) => {
      this.eventSource.onmessage = (event: MessageEvent) => {
        observer.next(event);
      };

      this.eventSource.onerror = (error: any) => {
        observer.error(error);
      };

      this.eventSource.onclose = () => {
        observer.complete();
      };
    });
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
