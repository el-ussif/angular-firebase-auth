import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AclService } from 'src/app/utils/acl.service';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-account-configuration',
  templateUrl: './account-configuration.component.html',
  styleUrls: ['./account-configuration.component.scss'],
})
export class AccountConfigurationComponent implements OnInit {
  @Input() typeUserUrl: any = '';
  focus: boolean = false;
  focus1: boolean = false;
  currentUser: any = {};
  // in app.component.ts
  filesIdCard: File[] = [];
  filesAgrementFile: File[] = [];
  private updateProvider: boolean = false;
  private saving: boolean = false;

  constructor(
    private  authService: AuthService,
    private  customEncryptionDecryptionService: CustomEncryptionDecryptionService,
    private  customToaster: CustomToaster,
    private  serverBridgeService: ServerBridgeService,
    public customFormValidationService: CustomFormValidationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.serverBridgeService.loadResource('/auth/me', false).subscribe(response => {
      this.currentUser = response;
    }, (error) => {
      this.customToaster.showErrorMessage('grid.configuration.auth-error');
      localStorage.removeItem('userData');
      localStorage.removeItem('userAccessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
      this.router.navigate(['auth']);
    });
  }

  async onSubmit() {

    const formData: FormData = new FormData();
    this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
    console.log('Our user is', this.currentUser);
    formData.append('_id', this.currentUser.customer._id);
    formData.append('legalForm', this.currentUser.legalForm);
    formData.append('tvaNumber', this.currentUser.tvaNumber);
    formData.append('taxAccountNumber', this.currentUser.taxAccountNumber);
    formData.append('rccmNumber', this.currentUser.rccmNumber);
    formData.append('idCardFile', this.currentUser.idCardFile);
    formData.append('agrementFile', this.currentUser.agrementFile);
    this.serverBridgeService.updateResource(this.typeUserUrl, formData, this.currentUser.customer._id, false).subscribe((response) => {
      this.saving = false;
      this.updateProvider = false;
      this.customToaster.showSuccessMessage('grid.configuration.auth-error');
      if (this.typeUserUrl === '/customers/') {
        this.router.navigate(['dashboards/customers-dashboard']);
      }
      if (this.typeUserUrl === '/providers/') {
        this.router.navigate(['dashboards/providers-dashboard']);
      }
    }, (errors) => {
      this.saving = false;
      this.updateProvider = false;
      this.customToaster.showErrorMessage('grid.configuration.auth-error');
    });
  }

  onSelectIdCard(event: any) {
    this.currentUser.idCardFile = event.addedFiles[0]
    this.filesIdCard.push(...event.addedFiles);
    if (this.filesIdCard.length > 1) { // checking if files array has more than one content
      this.replaceFileIdCard(); // replace file
    }
  }

  onRemoveIdCard(event: any) {
    this.currentUser.idCardFile = undefined;
    this.filesIdCard.splice(this.filesIdCard.indexOf(event), 1);
  }

  replaceFileIdCard() {
    this.filesIdCard.splice(0, 1); // index =0 , remove_count = 1
  }


  onSelectAgrementFile(event: any) {
    this.currentUser.agrementFile = event.addedFiles[0]
    this.filesAgrementFile.push(...event.addedFiles);
    if (this.filesAgrementFile.length > 1) { // checking if files array has more than one content
      this.replaceFileAgrementFile(); // replace file
    }
  }

  replaceFileAgrementFile() {
    this.filesAgrementFile.splice(0, 1); // index =0 , remove_count = 1
  }

  onRemoveAgrementFile(event: any) {
    this.currentUser.agrementFile = undefined;
    this.filesAgrementFile.splice(this.filesAgrementFile.indexOf(event), 1);
  }
}
