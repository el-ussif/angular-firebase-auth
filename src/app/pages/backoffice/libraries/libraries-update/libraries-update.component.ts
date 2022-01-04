import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-libraries-update',
  templateUrl: './libraries-update.component.html',
  styleUrls: ['./libraries-update.component.scss']
})
export class LibrariesUpdateComponent implements OnInit {
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
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getTaile();
  }

  async loadAuthorCollection() {
    this.tempCollections = [];
    if(!this.taile.id) {
      this.taile.collection = null;
    }
    this.collections.forEach(item => {
      if (item.author.id == this.taile.author) {
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

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      await this.serverBridgeService.loadResource('/users/collections', false).subscribe(response => {
        if (response.length) {
          this.collections = response;
          console.log('coll load');
          resolve(true)
        }
        this.loading = false;
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      formData.append('title', this.taile.title);
      formData.append('language', this.taile.language);
      formData.append('collection', this.taile.collection);
      formData.append('cover', this.taile.cover);

      if (this.taile && this.taile.cover && this.taile.cover.type) {
        formData.append('author', this.taile.author);
      }
      if (this.taile && this.taile.audio && this.taile.audio.type) {
        formData.append('audio', this.taile.audio);
      }
      if (this.taile?.tags?.length) {
        // formData.append('tags', JSON.stringify(this.taile.tags || []));
      }
      formData.append('description', this.taile.description);
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.updateResource('/tailes/', formData, this.taile.id, false).subscribe(() => {
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

  getTaile() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/tailes/', id, '').subscribe(async (response) => {
        this.taile = response;
        await this.getAuthors();
        await this.getLangues();
        await this.getTags();
        const tags: any[] = [];
        this.taile.tags.forEach((item: any) => {
          tags.push(item.id)
        });
        this.taile.author = response?.author?.id;
        await this.getCollections().then(() => {
          this.loadAuthorCollection();
        });
        this.taile.collection = response?.collection?.id;
        this.taile.language = response?.language?.id;
        this.taile.tags = tags;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.tailes.can-t-be-update');
      this.router.navigate(['/tailes']);
    });
  }
}
