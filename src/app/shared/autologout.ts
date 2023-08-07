import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  private readonly inactivityTimeout = 15 * 60 * 1000; // 15 minutes in milliseconds
  private timeoutId: any;
  private isListening = false;

  constructor(private router: Router) {
    this.initNavigationListener();
    this.initEventListeners();
    this.resetTimer();
  }

  resetTimer(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      console.log('User has been automatically logged out due to inactivity.');
    }, this.inactivityTimeout);
  }

  private initEventListeners(): void {
    document.addEventListener('mousemove', this.resetTimer.bind(this));
    document.addEventListener('keydown', this.resetTimer.bind(this));
    document.addEventListener('mousedown', this.resetTimer.bind(this));
    document.addEventListener('touchstart', this.resetTimer.bind(this));
    this.isListening = true;
  }

  removeEventListeners(): void {
    document.removeEventListener('mousemove', this.resetTimer.bind(this));
    document.removeEventListener('keydown', this.resetTimer.bind(this));
    document.removeEventListener('mousedown', this.resetTimer.bind(this));
    document.removeEventListener('touchstart', this.resetTimer.bind(this));
    this.isListening = false;
  }

  private initNavigationListener(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.resetTimer();
        if (this.isListening) {
          this.removeEventListeners();
        }
      }
    });
  }
}
