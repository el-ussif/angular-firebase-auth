import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-tags-update',
  templateUrl: './tags-update.component.html',
  styleUrls: ['./tags-update.component.scss']
})
export class TagsUpdateComponent implements OnInit {
  loading: boolean = true;
  tag: any = {};
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
    this.getCategory();
  }

  onSubmit(form: NgForm) {
    console.log('On submit', this.tag);
    if (form.valid) {
      this.submited = true;
      this.serverBridgeService.updateResource('/tags/', this.tag).subscribe(response => {
        this.submited = false;
        this.tag = {
          code: '',
          title: '',
          type: ''
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

  getCategory() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/tags/', id, '').subscribe(response => {
        this.tag = response;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.tags.can-t-be-update');
      this.router.navigate(['/tags']);
    });
  }
}
