import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.scss']
})
export class CategoriesUpdateComponent implements OnInit {
  loading: boolean = true;
  category: any = {};
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
    console.log('On submit', this.category);
    if (form.valid) {
      this.submited = true;
      this.serverBridgeService.updateResource('/categories/', this.category).subscribe(response => {
        this.submited = false;
        this.category = {
          code: '',
          title: '',
          type: ''
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

  getCategory() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/categories/', id, '').subscribe(response => {
        this.category = response;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.categories.can-t-be-update');
      this.router.navigate(['/categories']);
    });
  }
}
