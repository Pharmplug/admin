import { Component, OnInit, OnDestroy,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AutoLogoutService } from './shared/autologout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'admindashboard';
  constructor(private elementRef: ElementRef,public  _router: Router,private autoLogoutService: AutoLogoutService) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
 // Start listening for user activity and initialize the timer
 this.autoLogoutService.resetTimer();

    
  }

  ngOnDestroy(): void {
     // Clean up the event listeners to avoid memory leaks
  this.autoLogoutService.removeEventListeners();
  }


}
