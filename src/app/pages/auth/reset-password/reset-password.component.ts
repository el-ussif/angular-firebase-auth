import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { CustomToaster } from 'src/app/utils/custom-toaster';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  focus: boolean = false;
  focus1: boolean = false;
  @Input()
  code: any = '';
  password: any = {
    // email: "eltester@email.com",
    email: "paul.alogno@gmail.com",
    new: "00000000",
    old: "00000000",
  };
  equalTo: boolean = true;

  constructor(
    private  authService:  AuthService,
    private router: Router,
    private  customToaster:  CustomToaster,
    public customFormValidationService: CustomFormValidationService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this.authService.ConfirmPasswordReset(this.code, this.password.main);
  }

  isSame() {
    this.equalTo = this.password.confirm === this.password.main;
  }
}
