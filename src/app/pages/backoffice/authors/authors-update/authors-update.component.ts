import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-update',
  templateUrl: './authors-update.component.html',
  styleUrls: ['./authors-update.component.scss']
})
export class AuthorsUpdateComponent implements OnInit {
  author: any = {};
  loading: boolean = true;
  profilePicFiles: any[] = [];
  submited: boolean = false;


  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getAuthor();
  }

  onSubmit(form: NgForm) {
    console.log('On submit', this.author);
    if (form.valid) {
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      formData.append('firstname', this.author.firstname);
      formData.append('lastname', this.author.lastname);
      if (this.author && this.author.profilePic && this.author.profilePic.type) {
        formData.append('profilePic', this.author.profilePic);
      }
      formData.append('pseudo', this.author.pseudo);
      formData.append('bio', this.author.bio);
      formData.append('email', this.author.email);
      formData.append('phoneNumber', this.author.phoneNumber);
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.updateResource('/authors/', formData, this.author.id, false).subscribe(() => {
        this.submited = false;
        this.router.navigate(['/authors']);
        this.customToaster.showSuccessMessage('operations.success');
      }, (error => {
        this.submited = false;
        console.log(error);
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

  getAuthor() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/authors/', id, '').subscribe(response => {
        this.author = response;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.authors.can-t-be-update');
      this.router.navigate(['/authors']);
    });
  }
}
