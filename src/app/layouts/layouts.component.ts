import { Component, OnInit,AfterViewInit } from '@angular/core';
import { WebsocketService } from '../shared/websocket/listener.component';

export const LAYOUT_VERTICAL = 'vertical';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit,AfterViewInit {




  ngAfterViewInit() {
  }
  receivedMessages: string[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect();
  
  }
}
