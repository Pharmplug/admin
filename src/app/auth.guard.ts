import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router) { }

  // This method is used to determine if the user is authorized to access the requested route.
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if user is authenticated, if yes, allow access
    if (localStorage.getItem('user')!==null) {
     
      return true;
    } else {
      // If not authenticated, redirect user to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
