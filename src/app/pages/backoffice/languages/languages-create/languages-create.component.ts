import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-languages-create',
  templateUrl: './languages-create.component.html',
  styleUrls: ['./languages-create.component.scss']
})
export class LanguagesCreateComponent implements OnInit {
  language: any = {};
  submited: boolean = false;

  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('On submit', this.language);
    if (form.valid) {
      this.submited = true;
      this.serverBridgeService.storeResource('/languages', this.language).subscribe(response => {
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

}
