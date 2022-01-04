import { Component, OnInit } from '@angular/core';
import { CustomFormValidationService } from 'src/app/utils/custom-form-validation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  focus: boolean = false;
  focus1: boolean = false;
  credential: any = {
    email: 'elyoussifaw@gmail.com',
    password: '00000000',
  };

  constructor(
    private  authService: AuthService,
    public customFormValidationService: CustomFormValidationService,
  ) {
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this.authService.SignIn(this.credential.email, this.credential.password);
  }
}
