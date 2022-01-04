import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-collections-show',
  templateUrl: './collections-show.component.html',
  styleUrls: ['./collections-show.component.scss']
})
export class CollectionsShowComponent implements OnInit {
  collection: any = {};
  submited: boolean = false;
  loading: boolean = true;
  role: string = ''

  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
  ) {
    this.role = customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');
  }

  ngOnInit(): void {
    this.getCollection();
  }

  getCollection() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/collections/', id, '').subscribe(async (response) => {
        this.collection = response;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.collections.can-t-be-update');
      this.router.navigate(['/collections']);
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
      this.translate.get('swal.validate-cover').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.collection.coverDesigned = !this.collection.coverDesigned;
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
      this.translate.get('swal.validate-content').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.collection.validated = !this.collection.validated;
        }
      });
      this.customToaster.showSuccessMessage('swal.validate-content.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.validate-content.error');
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
      this.translate.get('swal.delete-resource').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
          this.router.navigate(['/collections']);
        }
      });
      this.customToaster.showSuccessMessage('swal.delete-resource.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.delete-resource.error');
    });
  }

}
