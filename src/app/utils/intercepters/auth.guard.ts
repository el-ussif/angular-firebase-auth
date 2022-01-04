import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from 'src/app/pages/auth/auth.service';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private role: string;
  constructor(
    private  authService: AuthService,
    private router: Router,
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
    private  customToaster:  CustomToaster,
  ) {
    this.role = customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authService.isLoggedIn;
    if (isLogged) {
      return true;
    } else {
      return this.router.navigate(['auth']);
    }
  }
}
