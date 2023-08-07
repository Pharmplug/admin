import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevAccessGuard implements CanActivate {
  constructor(private router:Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // Check if user is authenticated
  if (localStorage.getItem('role')) {
    // If user is authenticated, restrict access based on their role
    const isPermitted = this.restrict();
    if (isPermitted) {
      // If user is permitted, allow access
      return true;
    } else {
      // If user is not permitted, redirect to login page
     // this.router.navigate(['/login']);
      return false;
    }
  } else {
    // If user is not authenticated, redirect to login page
   // this.router.navigate(['/login']);
    return false;
  }
}



  restrict(): boolean {
    let role = localStorage.getItem('role');
    let isPermitted=false;
    console.log(isPermitted)
    console.log(role)
    if (role === '0') {
      isPermitted = true;
    } else if (role === '1' || role === '2') {
      isPermitted = false;
    } else if (role === '3') {
      isPermitted = true;
      console.log(isPermitted)
    }
  
    return true;
  }
  
}
