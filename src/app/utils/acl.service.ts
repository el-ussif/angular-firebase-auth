import { Injectable } from '@angular/core';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';

@Injectable({
  providedIn: 'root'
})
export class AclService {
  private permissions: any = [];
  constructor(
    private customEncryptionDecryptionService: CustomEncryptionDecryptionService,
  ) {
    const permissions = this.customEncryptionDecryptionService.decrypt(localStorage.getItem('permissions'));
    this.permissions = JSON.parse(permissions);
    console.log(this.permissions);
  }

  havePermission(permission: any) {
    let hasPermission = false;
    this.permissions.forEach((item: any) => {
      if (item === permission) {
        hasPermission = true;
      }
    });
    return hasPermission;
  }
}
