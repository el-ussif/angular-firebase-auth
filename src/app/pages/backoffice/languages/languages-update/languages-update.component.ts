import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-languages-update',
  templateUrl: './languages-update.component.html',
  styleUrls: ['./languages-update.component.scss'],
})
export class LanguagesUpdateComponent implements OnInit {
  loading: boolean = true;
  language: any = {};
  submited: boolean = false;

  constructor(
    private customToaster: CustomToaster,
    private serverBridgeService: ServerBridgeService,
    public customFormValidationService: CustomFormValidationService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.getLanguage();
  }

  onSubmit(form: NgForm) {
    console.log('On submit', this.language);
    if (form.valid) {
      this.submited = true;
      this.serverBridgeService.updateResource('/languages/', this.language).subscribe(response => {
        this.submited = false;
        this.language = {
          code: '',
          title: '',
          type: ''
        }
        this.router.navigate(['/languages']);
        this.customToaster.showSuccessMessage('operations.success');
      }, (error => {
        this.submited = false;
        console.log(error);
        this.customToaster.showErrorMessage('operations.error');
        this.customToaster.showNotification('danger', 'Error', error?.message);
      }));
    }
  }

  getLanguage() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/languages/', id, '').subscribe(response => {
        this.language = response;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.languages.can-t-be-update');
      this.router.navigate(['/languages']);
    });
  }
}
