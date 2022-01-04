import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';

@Injectable({
  providedIn: 'root'
})
export class UserHasRoleGuard implements CanActivate {
  constructor(
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
    private router: Router,
    private customToaster: CustomToaster,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserHasRole(route);
  }

  checkUserHasRole(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');
    if (['ADMIN', 'AGENT', 'DESIGNER'].includes(userRole)) {
      const roles = route.data.roles;
      if (roles.includes(userRole)) {
        return true;
      } else {
        this.customToaster.showWarningMessage('messages.unautorized')
        this.router.navigate(['/']);
        return false;
      }
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
