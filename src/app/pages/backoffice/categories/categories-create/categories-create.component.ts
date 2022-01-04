import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {
  category: any = {};
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
    console.log('On submit', this.category);
    if (form.valid) {
      this.submited = true;
      this.serverBridgeService.storeResource('/categories', this.category).subscribe(response => {
        this.submited = false;
        this.category = {
          title: ''
        }
        this.router.navigate(['/categories']);
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
