import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categories-listing',
  templateUrl: './categories-listing.component.html',
  styleUrls: ['./categories-listing.component.scss']
})
export class CategoriesListingComponent implements OnInit {
  saving: boolean = false;
  loading: boolean = true;
  currentCustomer: any = {};
  customers: any[] = [];
  datas: any[] = [];
  temp: any[] = [];
  activeRow: any = {};
  entries: number = 10;

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
    this.getLanguages();
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

  getLanguages() {
    this.loading = true;
    this.serverBridgeService.loadResource('/categories', false).subscribe(response => {
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
    this.serverBridgeService.deleteResource('/categories/', resourceId).subscribe(response => {
      this.getLanguages();
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
