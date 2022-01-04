import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.scss'],
})
export class AuthorsCreateComponent implements OnInit {
  author: any = {};
  profilePicFiles: any[] = [];
  submited: boolean = false;


  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (!(this.author && this.author.profilePic && this.author.profilePic.type)) {
        return this.customToaster.showErrorMessage('grid.authors.empty-file');
      }
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      formData.append('firstname', this.author.firstname);
      formData.append('lastname', this.author.lastname);
      formData.append('profilePic', this.author.profilePic);
      formData.append('pseudo', this.author.pseudo);
      formData.append('bio', this.author.bio);
      formData.append('email', this.author.email);
      formData.append('phoneNumber', this.author.phoneNumber);
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.storeResource('/authors', formData, false).subscribe(() => {
        this.submited = false;
        this.router.navigate(['/authors']);
        this.customToaster.showSuccessMessage('operations.success');
      }, (error => {
        this.submited = false;
        this.customToaster.showWarningMessage('operations.error');
        this.customToaster.showNotification('danger', 'Error', error?.message);
      }));
    }
  }

  onSelectProfilePicFiles(event: any) {
    this.author.profilePic = event.addedFiles[0];
    this.profilePicFiles.push(...event.addedFiles);
    if (this.profilePicFiles.length > 1) { // checking if files array has more than one content
      this.replaceProfilePicFiles(); // replace file
    }
  }

  replaceProfilePicFiles() {
    this.profilePicFiles.splice(0, 1);
  }

  onRemoveProfilePicFiles(event: any) {
    this.author.profilePic = undefined;
    this.profilePicFiles.splice(this.profilePicFiles.indexOf(event), 1);
  }
}
