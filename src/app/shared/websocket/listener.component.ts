import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;

  constructor(private toastr: ToastrService,) { }

  connect(): void {
    this.socket = new WebSocket('wss://pharmplug-api.onrender.com?id=admin');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);

      // Check the message content to determine its type
      try {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.id && parsedMessage.phone) {
          // This is a data message
          console.log('Data message received:', parsedMessage);
          this.toastr.warning(`New order ${parsedMessage['deliverytype']
        } order from ${parsedMessage['surname']
          } of ${parsedMessage['price']} naira`, `Success `, {
            timeOut: 15000,
          });

          // Handle the data message here, e.g., update UI or trigger actions
        } else if (parsedMessage === 'User admin connected!') {
          // This is a user connection message
          console.log('User connected:', parsedMessage);

          // Handle the user connection message here, e.g., display a notification
        } else {
          // Handle other types of messages or unknown formats
          console.warn('Unknown message format:', parsedMessage);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.socket.close();
  }
}
