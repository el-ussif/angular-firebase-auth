import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { AuthService } from '../../pages/auth/auth.service';
import { CustomToaster } from '../custom-toaster';
import { ServerBridgeService } from '../http/server-bridge.service';

@Injectable({
  providedIn: 'root',
})
export class UserTypeGuard implements CanActivate {
  constructor(
    private  authService: AuthService,
    private  customEncryptionDecryptionService: CustomEncryptionDecryptionService,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
    private  customToaster: CustomToaster,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.authService.isLoggedIn;
    if (isLogged) {
      this.serverBridgeService.loadResource('/auth/me', false).subscribe(response => {
      }, (error) => {
        this.authService.SignOut();
      });
      return true
    } else {
      return false;
    }
  }
}
