import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-tags-create',
  templateUrl: './tags-create.component.html',
  styleUrls: ['./tags-create.component.scss']
})
export class TagsCreateComponent implements OnInit {
  tag: any = {};
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
    console.log('On submit', this.tag);
    if (form.valid) {
      this.submited = true;
      this.serverBridgeService.storeResource('/tags', this.tag).subscribe(response => {
        this.submited = false;
        this.tag = {
          title: ''
        }
        this.router.navigate(['/tags']);
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
