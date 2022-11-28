import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../../../shared/services/auth-data-service/auth-data.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  form = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
  });

  constructor(
    private authDataService: AuthDataService,
    private loginService: LoginService
  ) {}

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const userData = {
      login: this.form.value.login?.trim(),
      password: this.form.value.password,
    };
    this.loginService.logIn(userData);
  }
}
