import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-libraries-create',
  templateUrl: './libraries-create.component.html',
  styleUrls: ['./libraries-create.component.scss']
})
export class LibrariesCreateComponent implements OnInit {
  taile: any = {};
  coverFiles: any[] = [];
  tags: any[] = [];
  audioFiles: any[] = [];
  languages: any[] = [];
  authors: any[] = [];
  collections: any[] = [];
  submited: boolean = false;
  loading: boolean = true;
  tempCollections: any = [];

  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
  ) {
  }

  ngOnInit(): void {
    this.getCollections();
    this.getAuthors();
    this.getLangues();
    this.getTags();
  }

  loadAuthorCollection() {
    this.tempCollections = [];
    this.taile.collection = null;
    this.collections.forEach(item => {
      if (item.author.id == this.taile.author) {
        console.log('pushing');
        this.tempCollections.push(item)
      }
    });
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

  getTags() {
    this.loading = true;
    this.serverBridgeService.loadResource('/tags', false).subscribe(response => {
      if (response.length) {
        this.tags = response;
      }
      this.loading = false;
    });
  }

  getLangues() {
    this.loading = true;
    this.serverBridgeService.loadResource('/languages', false).subscribe(response => {
      if (response.length) {
        this.languages = response;
      }
      this.loading = false;
    });
  }

  getCollections() {
    this.loading = true;
    this.serverBridgeService.loadResource('/users/collections', false).subscribe(response => {
      if (response.length) {
        this.collections = response;
      }
      this.loading = false;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (!(this.taile && this.taile.cover && this.taile.cover.type)) {
        return this.customToaster.showErrorMessage('grid.tailes.empty-cover-file');
      }
      if (!(this.taile && this.taile.audio && this.taile.audio.type)) {
        return this.customToaster.showErrorMessage('grid.tailes.empty-audio-file');
      }
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      formData.append('title', this.taile.title);
      formData.append('language', this.taile.language);
      formData.append('collection', this.taile.collection);
      formData.append('cover', this.taile.cover);
      formData.append('audio', this.taile.audio);
      formData.append('author', this.taile.author);
      formData.append('description', this.taile.description);
      if (this.taile?.tags?.length) {
        // formData.append('tags', JSON.stringify(this.taile.tags || []));
      }
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.storeResource('/tailes', formData, false).subscribe(() => {
        this.submited = false;
        this.router.navigate(['/tailes']);
        this.customToaster.showSuccessMessage('operations.success');
      }, (error => {
        this.submited = false;
        this.customToaster.showWarningMessage('operations.error');
        this.customToaster.showNotification('danger', 'Error', error?.message);
      }));
    }
  }

  onSelectCoverFiles(event: any) {
    this.taile.cover = event.addedFiles[0];
    this.coverFiles.push(...event.addedFiles);
    if (this.coverFiles.length > 1) { // checking if files array has more than one content
      this.replaceCoverFiles(); // replace file
    }
  }

  replaceCoverFiles() {
    this.coverFiles.splice(0, 1);
  }

  onRemoveCoverFiles(event: any) {
    this.taile.cover = undefined;
    this.coverFiles.splice(this.coverFiles.indexOf(event), 1);
  }

  onSelectAudioFiles(event: any) {
    this.taile.audio = event.addedFiles[0];
    this.audioFiles.push(...event.addedFiles);
    if (this.audioFiles.length > 1) { // checking if files array has more than one content
      this.replaceAudioFiles(); // replace file
    }
  }

  replaceAudioFiles() {
    this.audioFiles.splice(0, 1);
  }

  onRemoveAudioFiles(event: any) {
    this.taile.audio = undefined;
    this.audioFiles.splice(this.audioFiles.indexOf(event), 1);
  }
}
