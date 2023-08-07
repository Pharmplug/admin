import { Component, OnInit,AfterViewInit } from '@angular/core';

export const LAYOUT_VERTICAL = 'vertical';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit,AfterViewInit {


  constructor() { }

  ngOnInit() {
    // default settings
 
    // listen to event and change the layout, theme, etc
    //this.eventService.subscribe('changeLayout', (layout) => {
      //this.layoutType = layout;
    //});
  }

  ngAfterViewInit() {
  }

}
