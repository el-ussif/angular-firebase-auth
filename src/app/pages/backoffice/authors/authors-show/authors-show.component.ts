import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-authors-show',
  templateUrl: './authors-show.component.html',
  styleUrls: ['./authors-show.component.scss']
})
export class AuthorsShowComponent implements OnInit {
  author: any = {};
  submited: boolean = false;
  loading: boolean = true;

  constructor(
    public customFormValidationService: CustomFormValidationService,
    private customToaster: CustomToaster,
    private router: Router,
    private serverBridgeService: ServerBridgeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getCollection();
  }

  getCollection() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') !== null ? params.get('id') : 0;
      this.serverBridgeService.getResource('/authors/', id, '').subscribe(async (response) => {
        this.author = response;
        this.loading = false;
      });
    }, (error: any) => {
      this.loading = false;
      this.customToaster.showWarningMessage('grid.authors.can-t-be-update');
      this.router.navigate(['/authors']);
    });
  }
}
