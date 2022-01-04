import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Track } from 'ngx-audio-player';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-libraries-show',
  templateUrl: './libraries-show.component.html',
  styleUrls: ['./libraries-show.component.scss'],
})
export class LibrariesShowComponent implements OnInit {
  isToUpdate: boolean = false;
  taile: any = {};
  contentTranslate: any = {};
  tags: any[] = [];
  audioFiles: any[] = [];
  languages: any[] = [];
  authors: any[] = [];
  collections: any[] = [];
  submited: boolean = false;
  loading: boolean = true;
  tempCollections: any = [];
  msaapDisplayPlayList = true;
  msaapDisplayRepeatControls = true;
  tracks: Track[] = [];
  private modalRef: any = {};
  role: string = '';

  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private modalService: NgbModal,
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
  ) {
    this.role = customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');
  }

  ngOnInit(): void {
    this.getTaile();
    this.getLangues();
  }

  getTaile() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/tailes/', id, '').subscribe(async (response) => {
        this.taile = response;
        const track: Track = {
          title: this.taile.title,
          link: this.taile.audio,
          artist: `${ this.taile?.author?.firstname } ${ this.taile?.author?.lastname }`,
        }
        this.tracks = []
        this.tracks.push(track)
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.tailes.can-t-be-update');
      this.router.navigate(['/tailes']);
    });
  }

  questionToDelete(resourceId: any) {
    this.translate.get('swal.delete-resource').subscribe(response => {
      if (response) {
        swal.fire({
          title: response.title,
          text: response.text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: response.confirmButtonText,
          cancelButtonText: response.cancelButtonText,
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteResource(resourceId)
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal.fire(
              response.canceled.title,
              response.canceled.html,
              'error',
            )
          }
        });
      }
    });
  }

  deleteResource(resourceId: any) {
    this.serverBridgeService.deleteResource('/tailes/', resourceId).subscribe(response => {
      this.translate.get('swal.delete-resource').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.router.navigate(['/tailes']);
        }
      });
      this.customToaster.showSuccessMessage('swal.delete-resource.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.delete-resource.error');
    });
  }

  questionToDeleteContentTranslate(resourceId: any) {
    this.translate.get('swal.delete-resource').subscribe(response => {
      if (response) {
        swal.fire({
          title: response.title,
          text: response.text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: response.confirmButtonText,
          cancelButtonText: response.cancelButtonText,
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteResourceContentTranslate(resourceId)
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal.fire(
              response.canceled.title,
              response.canceled.html,
              'error',
            )
          }
        });
      }
    });
  }

  deleteResourceContentTranslate(resourceId: any) {
    this.serverBridgeService.deleteResource('/tailes/taile-translates/', resourceId).subscribe(response => {
      this.translate.get('swal.delete-resource').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.getTaile();
        }
      });
      this.customToaster.showSuccessMessage('swal.delete-resource.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.delete-resource.error');
    });
  }

  questionToValidateCover(resourceId: any) {
    this.translate.get('swal.validate-cover').subscribe(response => {
      if (response) {
        swal.fire({
          title: response.title,
          text: response.text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: response.confirmButtonText,
          cancelButtonText: response.cancelButtonText,
        }).then((result) => {
          if (result.isConfirmed) {
            this.validateCover(resourceId)
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal.fire(
              response.canceled.title,
              response.canceled.html,
              'error',
            )
          }
        });
      }
    });
  }

  validateCover(resourceId: any) {
    this.serverBridgeService.getResource('/tailes/validate/cover/', resourceId).subscribe(response => {
      this.translate.get('swal.validate-cover').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.taile.coverDesigned = !this.taile.coverDesigned;
        }
      });
      this.customToaster.showSuccessMessage('swal.validate-cover.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.validate-cover.error');
    });
  }

  questionToValidateContent(resourceId: any) {
    this.translate.get('swal.validate-content').subscribe(response => {
      if (response) {
        swal.fire({
          title: response.title,
          text: response.text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: response.confirmButtonText,
          cancelButtonText: response.cancelButtonText,
        }).then((result) => {
          if (result.isConfirmed) {
            this.validateContent(resourceId)
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal.fire(
              response.canceled.title,
              response.canceled.html,
              'error',
            )
          }
        });
      }
    });
  }

  validateContent(resourceId: any) {
    this.serverBridgeService.getResource('/tailes/validate/content/', resourceId).subscribe(response => {
      this.translate.get('swal.validate-content').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.taile.validated = !this.taile.validated;
        }
      });
      this.customToaster.showSuccessMessage('swal.validate-content.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.validate-content.error');
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

  onSelectAudioFiles(event: any) {
    this.contentTranslate.audio = event.addedFiles[0];
    this.audioFiles.push(...event.addedFiles);
    if (this.audioFiles.length > 1) { // checking if files array has more than one content
      this.replaceAudioFiles(); // replace file
    }
  }

  replaceAudioFiles() {
    this.audioFiles.splice(0, 1);
  }

  onRemoveAudioFiles(event: any) {
    this.contentTranslate.audio = undefined;
    this.audioFiles.splice(this.audioFiles.indexOf(event), 1);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      //formData.append('title', this.contentTranslate.title);
      formData.append('language', this.contentTranslate.language);
      formData.append('taile', this.taile.id);
      formData.append('description', this.contentTranslate.description);

      if (this.taile && this.contentTranslate.audio && this.contentTranslate.audio.type) {
        formData.append('audio', this.contentTranslate.audio);
      }

      this.customToaster.showInfoMessage('operations.pending');
      if (!this.isToUpdate) {
        this.serverBridgeService.storeResource('/tailes/taile-translates', formData, false).subscribe((res) => {
          this.submited = false;
          this.contentTranslate = {};
          this.audioFiles = [];
          this.modalRef.close();
          this.getTaile();
          this.customToaster.showSuccessMessage('operations.success');
        }, (error => {
          this.submited = false;
          this.customToaster.showWarningMessage('operations.error');
          this.customToaster.showNotification('danger', 'Error', error?.message);
        }));
      } else {
        this.serverBridgeService.updateResource('/tailes/taile-translates/', formData, this.contentTranslate.id, false).subscribe((res) => {
          this.submited = false;
          this.isToUpdate = false;
          this.contentTranslate = {};
          this.audioFiles = [];
          this.modalRef.close();
          this.getTaile();
          this.customToaster.showSuccessMessage('operations.success');
        }, (error => {
          this.submited = false;
          this.customToaster.showWarningMessage('operations.error');
          this.customToaster.showNotification('danger', 'Error', error?.message);
        }));
      }

    }
  }

  async openContentTranslateForm(content: any, contentTranslate?: any) {
    if (contentTranslate && contentTranslate.id) {
      this.contentTranslate = contentTranslate;
      this.contentTranslate.language = contentTranslate?.language?.id;
      this.isToUpdate = true;
    }
    this.openCustomModale(content, 'xl')
  }

  openCustomModale(content: any, type: any) {
    this.modalRef = this.modalService.open(content, {windowClass: 'modal-mini', size: type, centered: true});
    this.modalRef.result.then((result: any) => {
    }, (reason: any) => {
      this.tracks = [];
      this.contentTranslate = {};
    });
  }

  getPlaylist(taile: any) {
    const track: Track = {
      title: this.taile.title,
      link: taile.audio,
      artist: `${ this.taile?.author?.firstname } ${ this.taile?.author?.lastname } :: ${taile.language?.title}`,
    }
    const tracks: Track[] = [];
    tracks.push(track);
    return  tracks;
  }

}
