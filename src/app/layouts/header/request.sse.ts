import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor() {}

  getServerSentEvents(): Observable<any> {
    return new Observable((observer) => {
      const eventSource = new EventSource(`${environment.baseUrl}requests/sse`); // Replace with your server's URL
      eventSource.onmessage = (event) => {
        observer.next(event.data); // Directly pass the data without parsing
      };
      eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }
}
