import {Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class CustomToaster {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
  }
  showNotification(type: any, title: any, message: any) {
    const color = Math.floor(Math.random() * 5 + 1);
    if (type === 'default') {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span>' +
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">'+ title +'</span>' +
        '<span data-notify="message">'+ message +'</span>' +
        '</div>',
        '',
        {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-bottom-right',
          toastClass: 'ngx-toastr alert alert-dismissible alert-default alert-notify',
        },
      );
    }
    if (type === 'danger') {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span>' +
        '<div class="alert-text">' +
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">'+ title +'</span>' +
        '<span data-notify="message">'+ message +'</span>' +
        '</div>',
        '',
        {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-bottom-right',
          toastClass: 'ngx-toastr alert alert-dismissible alert-danger alert-notify',
        },
      );
    }
    if (type === 'success') {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span>' +
        '<div class="alert-text">' +
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">'+ title +'</span>' +
        '<span data-notify="message">'+ message +'</span>' +
        '</div>',
        '',
        {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-bottom-right',
          toastClass: 'ngx-toastr alert alert-dismissible alert-success alert-notify',
        },
      );
    }
    if (type === 'warning') {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span>' +
        '<div class="alert-text">' +
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">'+ title +'</span>' +
        '<span data-notify="message">'+ message +'</span>' +
        '</div>',
        '',
        {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-bottom-right',
          toastClass: 'ngx-toastr alert alert-dismissible alert-warning alert-notify',
        },
      );
    }
    if (type === 'info') {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span>' +
        '<div class="alert-text">' +
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">'+ title +'</span>' +
        '<span data-notify="message">'+ message +'</span>' +
        '</div>',
        '',
        {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: 'alert-title',
          positionClass: 'toast-bottom-right',
          toastClass: 'ngx-toastr alert alert-dismissible alert-info alert-notify',
        },
      );
    }
  }

  showFirebaseError(error: any): void {
    let key = '';
    if (error && error.code) {
      key = error.code.replace('/', '.')
    }
    if (key != '') {
      this.translate.get(key).subscribe(text => {
        this.showNotification('danger', 'Erreur', text);
      });
    }
  }

  showSuccessMessage(key: any): void {
    this.translate.get(key).subscribe(text => {
      this.showNotification('success', 'Success', text);
    });
  }

  showInfoMessage(key: any): void {
    this.translate.get(key).subscribe(text => {
      this.showNotification('info', 'Success', text);
    });
  }

  showErrorMessage(key: any): void {
    this.translate.get(key).subscribe(text => {
      this.showNotification('danger', 'Error', text);
    });
  }

  showWarningMessage(key: string) {
    this.translate.get(key).subscribe(text => {
      this.showNotification('warning', 'Warning', text);
    });
  }
}
