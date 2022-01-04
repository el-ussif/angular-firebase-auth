import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-collections-listing',
  templateUrl: './collections-listing.component.html',
  styleUrls: ['./collections-listing.component.scss']
})
export class CollectionsListingComponent implements OnInit {
  saving: boolean = false;
  loading: boolean = true;
  currentCollection: any = {};
  datas: any[] = [];
  temp: any[] = [];
  activeRow: any = {};
  entries: number = 10;
  role: string = '';
  coverFiles: any[] = [];
  cover: any = {};
  submited: boolean = false;
  private updateModal: any;

  constructor(
    private modalService: NgbModal,
    public customFormValidationService: CustomFormValidationService,
    protected serverBridgeService: ServerBridgeService,
    private customToaster: CustomToaster,
    private config: NgbModalConfig,
    private translate: TranslateService,
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
  ) {
    this.role = customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit(): void {
    this.getCollections();
  }

  onActivate(event: any) {
    this.activeRow = event.row;
  }

  entriesChange($event: any) {
    this.entries = $event.target.value;
  }

  filterTable($event: any) {
    let val = $event.target.value.toString().trim();
    this.temp = this.datas.filter(function (d: any) {
      for (var key in d) {
        if (d && d[key] && d[key] !== '') {
          const tempValue = d[key];
          if (tempValue.toString().toLowerCase().indexOf(val.toString().toLowerCase()) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }

  getCollections() {
    this.loading = true;
    this.serverBridgeService.loadResource('/users/collections', false).subscribe(response => {
      if (response.length) {
        this.datas = response;
        this.temp = this.datas.map((prop: any, key: any) => {
          return {
            ...prop,
            key,
          };
        });
      }
      this.loading = false;
    }, error => {

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
    this.serverBridgeService.deleteResource('/collections/', resourceId).subscribe(response => {
      this.getCollections();
      this.translate.get('swal.delete-resource').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
        }
      });
      this.customToaster.showSuccessMessage('swal.delete-resource.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.delete-resource.error');
    });
  }

  async seeCollection(content: any, collection: any) {
    this.currentCollection = collection;
    this.openCustomModale(content, 'lg')
  }

  openCustomModale(content: any, type: any) {
    this.updateModal = this.modalService.open(content, {windowClass: 'modal-mini', size: type, centered: true}).result.then((result) => {
    }, (reason) => {
      this.currentCollection = {};
      this.coverFiles = [];
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
    this.serverBridgeService.getResource('/collections/validate/cover/', resourceId).subscribe(response => {
      this.getCollections();
      this.translate.get('swal.validate-cover').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.currentCollection.coverDesigned = !this.currentCollection.coverDesigned;
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
    this.serverBridgeService.getResource('/collections/validate/content/', resourceId).subscribe(response => {
      this.getCollections();
      this.translate.get('swal.validate-content').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.currentCollection.validated = !this.currentCollection.validated;
        }
      });
      this.customToaster.showSuccessMessage('swal.validate-content.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.validate-content.error');
    });
  }

  async updateCollection(content: any, collection: any) {
    this.currentCollection = collection;
    this.openCustomModale(content, 'lg')
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submited = true;
      const formData: FormData = new FormData();
      this.serverBridgeService.setHttpHeader('Content-Type', 'multipart/form-data');
      if (!this.cover && this.cover.type) {
        return this.customToaster.showErrorMessage('grid.collections.empty-file');
      }
      formData.append('cover', this.cover);
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.updateResource('/collections/', formData, this.currentCollection.id, false).subscribe((res) => {
        this.submited = false;
        this.currentCollection = res.collection;
        this.modalService.dismissAll('close')
        this.getCollections();
        this.customToaster.showSuccessMessage('operations.success');
        this.updateModal.close()
      }, (error => {
        this.submited = false;
        this.customToaster.showWarningMessage('operations.error');
        this.customToaster.showNotification('danger', 'Error', error?.message);
      }));
    }
  }

  onSelectCoverFiles(event: any) {
    this.cover = event.addedFiles[0];
    this.coverFiles.push(...event.addedFiles);
    if (this.coverFiles.length > 1) { // checking if files array has more than one content
      this.replaceCoverFiles(); // replace file
    }
  }

  replaceCoverFiles() {
    this.coverFiles.splice(0, 1);
  }

  onRemoveCoverFiles(event: any) {
    this.cover = undefined;
    this.coverFiles.splice(this.coverFiles.indexOf(event), 1);
  }

}
