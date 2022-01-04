import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-collections-update',
  templateUrl: './collections-update.component.html',
  styleUrls: ['./collections-update.component.scss']
})
export class CollectionsUpdateComponent implements OnInit {
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
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getCollection();
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
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      formData.append('title', this.collection.title);
      formData.append('category', this.collection.category);
      if (this.collection && this.collection.cover && this.collection.cover.type) {
        formData.append('cover', this.collection.cover);
      }
      formData.append('collection', this.collection.collection);
      formData.append('description', this.collection.description);
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.updateResource('/collections/', formData, this.collection.id, false).subscribe(() => {
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

  getCollection() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/collections/', id, '').subscribe(async(response) => {
        this.collection = response;
        await this.getAuthors();
        await this.getCategories();
        this.collection.category = response?.category?.id;
        this.collection.author = response?.author?.id;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.collections.can-t-be-update');
      this.router.navigate(['/collections']);
    });
  }
}
