import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationMessages = validationMessages;
  public show: boolean = false;
  public loginForm: FormGroup;
  rememberMeObj: any = { email: '', password: '', rememberMe: false };

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    let rememberMeData: any = localStorage.getItem('rememberMe');
    if (rememberMeData != null) { this.rememberMeObj = JSON.parse(rememberMeData) }
  }

  ngOnInit() {
    this.initializeLoginForm()
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: [this.rememberMeObj.email, [Validators.required, Validators.email]],
      password: [this.rememberMeObj.password, Validators.required],
      rememberMe: [this.rememberMeObj.rememberMe]
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("login:", res);
          this.setLocalStorage(res, this.loginForm.value)
          this.router.navigate(["/system-admin/user-managment/practice-admin"]);
        }, error: (err) => {
          console.log("err:", err);
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        }
      });
    }
  }

  setLocalStorage(res: any, loginValues: any) {
    localStorage.setItem('user', JSON.stringify(res.data));
    if (this.loginForm.controls['rememberMe'].value) {
      localStorage.setItem('rememberMe', JSON.stringify(loginValues));
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

}
