import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url: string = state.url;
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate([''], { queryParams: { returnUrl:url}});
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route):  boolean {
    return this.authenticationService.isLoggedIn()
  }

  /*checkLogin(url: string): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      // Store the attempted URL for redirecting
      // Navigate to the login page with extras
      this.router.navigate(['/login'], { queryParams: { returnUrl: url}});
      return false;
    }
  }*/

  /*checkRole(route: ActivatedRouteSnapshot) {

  }*/


}
