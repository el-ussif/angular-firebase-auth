import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss'],
})
export class AfterLoginComponent implements OnInit {
  configuring: boolean = true;
  loading: boolean = true;
  isLoggedIn: boolean = false;
  userRoles: any[] = [];
  user: any = {};
  fbUser: any = {};
  userAccessToken: any = {};

  constructor(
    public router: Router,
    private authService:  AuthService,
    private serverBridgeService: ServerBridgeService,
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
    private  customToaster:  CustomToaster,
  ) {
    this.fbUser = localStorage.getItem('user');
    this.authService.SetUserDataInStorage();
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      if (this.fbUser && !this.userAccessToken) {
        document.location.reload();
      }
      if (!this.fbUser) {
        this.router.navigate(['auth']);
      }
    } else {
      this.serverBridgeService.loadResource('/auth/me', false).subscribe(response => {
        const role = response && response.roles && response.roles[0]
        const aclRoles = ['ADMIN', 'AGENT', 'DESIGNER']
        localStorage.setItem('role', this.customEncryptionDecryptionService.encrypt(role));
        if (aclRoles.includes(role)) {
          this.router.navigate(['/'])
        } else {
          console.log('here.........');
          this.customToaster.showWarningMessage('auth.unauthorized');
          this.authService.SignOut();
        }
      }, (error) => {
        this.authService.SignOut();
      });
    }
  }

  onRoleSelect(role: any) {
    switch (role) {
      case 'SUPER_ADMIN':
        this.router.navigate(['dashboards']);
        break;
      case 'CUSTOMER_SUPER_ADMIN':
      case 'CUSTOMER_ADMIN':
        if (this.user && this.user.customer && this.user.customer.validated === false) {
          this.router.navigate(['account-configuration/customers-setup']);
          break;
        }
        this.router.navigate(['dashboards/customers-dashboard']);
        break;
      case 'PROVIDER_SUPER_ADMIN':
      case 'PROVIDER_ADMIN':
        if (this.user && this.user.provider && this.user.provider.validated === false) {
          this.router.navigate(['account-configuration/providers-setup']);
          break;
        }
        this.router.navigate(['dashboards/providers-dashboard']);
        break;
      case 'INVESTOR':
        this.router.navigate(['dashboards/investors-dashboard']);
        break;
      default:
        this.customToaster.showNotification('warning', 'Erreur', 'Erreur de session veuillez vous reconnecter');
        this.authService.SignOut();
        break;
    }
  }
}
