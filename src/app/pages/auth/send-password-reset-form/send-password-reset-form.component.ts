import { Component, OnInit } from '@angular/core';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-send-password-reset-form',
  templateUrl: './send-password-reset-form.component.html',
  styleUrls: ['./send-password-reset-form.component.scss']
})
export class SendPasswordResetFormComponent implements OnInit {
  focus: boolean = false;
  credential: any = { email: "elyoussiaw@gmail.com" };

  constructor(
    private  authService:  AuthService,
    public customFormValidationService: CustomFormValidationService,
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.ForgotPassword(this.credential.email);
  }
}
