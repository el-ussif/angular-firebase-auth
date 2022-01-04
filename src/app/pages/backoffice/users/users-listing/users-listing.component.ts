import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  saving: boolean = false;
  loading: boolean = true;
  currentUser: any = {};
  datas: any[] = [];
  temp: any[] = [];
  activeRow: any = {};
  entries: number = 10;
  submited: boolean = false;
  user:any = {};

  constructor(
    private modalService: NgbModal,
    public customFormValidationService: CustomFormValidationService,
    protected serverBridgeService: ServerBridgeService,
    private customToaster: CustomToaster,
    private config: NgbModalConfig,
    private translate: TranslateService,
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit(): void {
    this.getUsers();
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

  getUsers() {
    this.loading = true;
    this.serverBridgeService.loadResource('/users', false).subscribe(response => {
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
    });
  }

  questionToEnableOrDisableAccount(resourceId: any) {
    this.translate.get('swal.account-manage').subscribe(response => {
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
            this.enableOrDisableAccount(resourceId)
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

  enableOrDisableAccount(resourceId: any) {
    this.serverBridgeService.getResource('/users/disable-enable/', resourceId).subscribe(response => {
      this.getUsers();
      this.currentUser.disabled = !this.currentUser.disabled;
      this.translate.get('swal.account-manage').subscribe(response => {
        if (response) {
          swal.fire(
            response.confirmed.title,
            response.confirmed.html,
            'success',
          )
        }
      });
      this.customToaster.showSuccessMessage('swal.account-manage.success');
      this.loading = false;
    }, (errors) => {
      this.customToaster.showErrorMessage('swal.account-manage.error');
    });
  }

  async seeAuthor(content: any, collection: any) {
    this.currentUser = collection;
    this.openCustomModale(content, 'lg')
  }

  openCustomModale(content: any, type: any) {
    this.modalService.open(content, {windowClass: 'modal-mini', size: type, centered: true}).result.then((result) => {
    }, (reason) => {
      this.currentUser = {};
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submited = true;
      this.customToaster.showInfoMessage('operations.pending');
      this.serverBridgeService.storeResource('/users/invite-admin', this.user ).subscribe((res) => {
        this.submited = false;
        this.user = {}
        this.customToaster.showSuccessMessage('operations.success');
      }, (error => {
        this.submited = false;
        this.customToaster.showWarningMessage('operations.error');
        this.customToaster.showNotification('danger', 'Error', error?.message);
      }));

    }
  }

  inviteUser(inviteUserFormModale: any) {
    this.openCustomModale(inviteUserFormModale, 'lg')
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
    this.serverBridgeService.deleteResource('/users/', resourceId).subscribe(response => {
      this.getUsers();
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

}
