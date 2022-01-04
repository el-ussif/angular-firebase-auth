import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate {
  constructor(
    private  authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authService.isLoggedIn;
    if (isLogged) {
      return this.router.navigate(['/']);
    } else {
      return true
    }
  }
}
