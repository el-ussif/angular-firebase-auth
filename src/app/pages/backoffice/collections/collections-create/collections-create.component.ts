import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-collections-create',
  templateUrl: './collections-create.component.html',
  styleUrls: ['./collections-create.component.scss']
})
export class CollectionsCreateComponent implements OnInit {
  collection: any = {};
  coverFiles: any[] = [];
  authors: any[] = [];
  categories: any[] = [];
  submited: boolean = false;
  loading: boolean = true;


  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAuthors();
  }

  getAuthors() {
    this.loading = true;
    this.serverBridgeService.loadResource('/users/authors', false).subscribe(response => {
      if (response.length) {
        this.authors = response;
      }
      this.loading = false;
    });
  }

  getCategories() {
    this.loading = true;
    this.serverBridgeService.loadResource('/categories', false).subscribe(response => {
      if (response.length) {
        this.categories = response;
      }
      this.loading = false;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (!(this.collection && this.collection.cover && this.collection.cover.type)) {
        return this.customToaster.showErrorMessage('grid.collections.empty-file');
      }
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      formData.append('title', this.collection.title);
      formData.append('category', this.collection.category);
      formData.append('cover', this.collection.cover);
      formData.append('author', this.collection.author);
      formData.append('description', this.collection.description);
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.storeResource('/collections', formData, false).subscribe(() => {
        this.submited = false;
        this.router.navigate(['/collections']);
        this.customToaster.showSuccessMessage('operations.success');
      }, (error => {
        this.submited = false;
        this.customToaster.showWarningMessage('operations.error');
        this.customToaster.showNotification('danger', 'Error', error?.message);
      }));
    }
  }

  onSelectCoverFiles(event: any) {
    this.collection.cover = event.addedFiles[0];
    this.coverFiles.push(...event.addedFiles);
    if (this.coverFiles.length > 1) { // checking if files array has more than one content
      this.replaceCoverFiles(); // replace file
    }
  }

  replaceCoverFiles() {
    this.coverFiles.splice(0, 1);
  }

  onRemoveCoverFiles(event: any) {
    this.collection.cover = undefined;
    this.coverFiles.splice(this.coverFiles.indexOf(event), 1);
  }
}
